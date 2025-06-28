import { Colors } from "@/constants/palette";
import { SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface SubtaskProps extends SubtaskType {
    header_image: string;
    onDelete?: (id: string) => void;
}

export default function Subtask({ id, title, short_description, is_done, header_image, onDelete }: SubtaskProps) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(is_done);
    const router = useRouter();
    const translateX = useSharedValue(0);
    const deleteOpacity = useSharedValue(0);

    useEffect(() => {
        setIsDone(is_done);
    }, [is_done]);

    useFocusEffect(
        useCallback(() => {
            const refreshData = async () => {
                const { data } = await supabase
                    .from("subtasks")
                    .select("is_done")
                    .eq("id", id)
                    .single();

                if (data) {
                    setIsDone(data.is_done);
                }
            };

            refreshData();
        }, [id])
    );

    const handlePress = () => {
        setIsLoading(true);
        router.push({
            pathname: "/(drawer)/(home)/(subtasks)/[id]",
            params: { id, header_image }
        });
        setIsLoading(false);
    }

    const handleCheckboxPress = async () => {
        setIsLoading(true);
        await supabase.from("subtasks").update({ is_done: !isDone }).eq("id", id);
        setIsDone(!isDone);
        setIsLoading(false);
    }

    const handleDelete = async () => {
        Alert.alert(
            t('home.subtask.delete'),
            t('home.subtask.deleteSubtaskMessage'),
            [
                {
                    text: t('common.delete'),
                    style: "destructive",
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            const { error } = await supabase
                                .from("subtasks")
                                .delete()
                                .eq("id", id);

                            if (error) {
                                Alert.alert(t('common.error'), t('home.subtask.errorDeleteSubtask'));
                            } else {
                                onDelete?.(id);
                            }
                        } catch (error) {
                            Alert.alert(t('common.error'), t('home.subtask.errorDeleteSubtask'));
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
                {
                    text: t('common.cancel'),
                    onPress: () => {
                        translateX.value = withTiming(0);
                        deleteOpacity.value = withTiming(0);
                    },
                },
            ]
        );
    };

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationX < 0) {
                const maxTranslation = -100;
                translateX.value = Math.max(event.translationX, maxTranslation);
                deleteOpacity.value = Math.min(Math.abs(event.translationX) / 100, 1);
            }
        })
        .onEnd((event) => {
            if (event.translationX < -50) {
                translateX.value = withTiming(-100);
                deleteOpacity.value = withTiming(1);
                runOnJS(handleDelete)();
            } else {
                translateX.value = withTiming(0);
                deleteOpacity.value = withTiming(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value }
            ],
        };
    });

    const deleteButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: deleteOpacity.value,
        };
    });

    return (
        <View style={styles.wrapper}>
            {/* Delete button background */}
            <Animated.View style={[styles.deleteButton, deleteButtonStyle]}>
                <FontAwesome name="trash" size={32} color="red" />
            </Animated.View>

            {/* Main content */}
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.container, isDone && styles.is_done, animatedStyle]}>
                    <TouchableOpacity onPress={handleCheckboxPress} disabled={isLoading}>
                        <MaterialCommunityIcons
                            name={isDone ? "checkbox-marked" : "checkbox-blank-outline"}
                            size={26}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.content}
                        onPress={handlePress}
                        disabled={isLoading}
                    >
                        <Text style={[styles.title, isDone && styles.is_done_text]}>{title}</Text>
                        <Text style={[styles.description, isDone && styles.is_done_text]}>{short_description}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        marginVertical: 5,
    },
    container: {
        flexDirection: "row",
        backgroundColor: "#F4F4F4",
        borderWidth: 4,
        borderColor: Colors.primary,
        borderRadius: 15,
        padding: 14,
        gap: 10,
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flex: 1,
        gap: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
    },
    is_done: {
        backgroundColor: "rgba(52, 84, 209, 0.3)",
    },
    is_done_text: {
        textDecorationLine: "line-through",
    },
    deleteButton: {
        position: 'absolute',
        right: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 15,
        zIndex: 0,
    },
})