import CreateGoalButton from "@/components/createGoalButton";
import { getGoal, getSubtasks } from "@/components/data";
import Subtask from "@/components/Subtask";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { GoalType, SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, FlatList, GestureResponderEvent, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GoalScreen() {
    const { id } = useLocalSearchParams();
    const { t } = useTranslation();
    const router = useRouter();
    const { user } = useUser();
    const [goal, setGoal] = useState<GoalType>();
    const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const handleSettings = () => {
        setShowSettingsModal(true);
    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                if (!id) return;

                const goalData = await getGoal(id as string);
                if (goalData) {
                    setGoal(goalData);
                    setIsDone(goalData?.is_done);
                    setIsStarred(goalData?.is_starred)

                    const subtasksData = await getSubtasks(goalData.id);
                    setSubtasks(subtasksData);
                } else {
                    Alert.alert(t("common.notFound"), t("common.notFoundMessage"));
                }
            };

            fetchData();
        }, [id])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        if (!id) return;
        const goalData = await getGoal(id as string);

        if (goalData) {
            setGoal(goalData);
            setIsDone(goalData?.is_done);
            setIsStarred(goalData?.is_starred)

            const subtasksData = await getSubtasks(goalData.id);
            setSubtasks(subtasksData);
        } else {
            Alert.alert(t("common.notFound"), t("common.notFoundMessage"));
            router.back();
        }

        setRefreshing(false);
    }, [id]);


    const handleDeleteGoal = useCallback(async () => {
        setIsDeleting(true);
        Alert.alert(t("home.goal.deleteGoal"), t("home.goal.deleteGoalMessage"), [
            {
                text: t("common.delete"), onPress: async () => {
                    await supabase.from("goals").delete().eq("id", id);
                    router.back();
                },
                style: "destructive"
            },
            { text: t("common.cancel") }
        ]);
        setIsDeleting(false);
    }, [id]);

    const handleStarGoal = useCallback(async () => {
        setIsStarred(!isStarred)
        await supabase.from('goals').update({ is_starred: false }).eq("creator_id", user?.id)
        await supabase.from('goals').update({ is_starred: !isStarred }).eq("id", id);
    }, [id, isStarred])

    const handleCheckboxPress = useCallback(async (event: GestureResponderEvent) => {
        event?.stopPropagation();
        setIsDone(!isDone);
        await supabase.from("goals").update({ is_done: !isDone }).eq("id", id);
        await supabase.from("subtasks").update({ is_done: !isDone }).eq("goal_id", id);
    }, [id, isDone]);

    const handleRouter = useCallback(() => {
        setIsLoading(true);
        router.push({
            pathname: "/editGoal",
            params: {
                goal_id: id as string,
            }
        });
        setIsLoading(false);
    }, [id]);

    const handleSubtaskDelete = useCallback((subtaskId: string) => {
        setSubtasks(prevSubtasks => prevSubtasks.filter(subtask => subtask.id !== subtaskId));
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.headerContainer}>
                    <Pressable style={styles.header} onPress={handleRouter} disabled={isLoading}>
                        <Image
                            source={{ uri: goal?.header_image }}
                            style={styles.image}
                        />
                        <View style={styles.headerTitles}>
                            <View style={styles.headerTitle}>
                                <Pressable onPress={handleCheckboxPress}>
                                    {isDone ? <MaterialCommunityIcons name="checkbox-marked-circle" size={28} color="green" /> : <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={28} color="black" />}
                                </Pressable>
                                <Text style={styles.title}>{goal?.icon}</Text>
                                <Text style={[styles.title, { textDecorationLine: isDone ? "line-through" : "none" }]} numberOfLines={1} ellipsizeMode="tail">{goal?.title}</Text>
                            </View>
                            <Text style={[styles.subtitle, { textDecorationLine: isDone ? "line-through" : "none" }]}>{goal?.short_description}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={[styles.button, styles.starButton]} onPress={handleStarGoal} disabled={isLoading}>
                                {isStarred ?
                                    <AntDesign name="star" size={28} color={Colors.golden} /> :
                                    <AntDesign name="staro" size={28} color={Colors.primary} />}
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.settingsButton]} onPress={handleSettings} disabled={isDeleting}>
                                <Entypo name="dots-three-horizontal" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </View>
                <FlatList
                    data={subtasks}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.subtasksListContainer}
                    scrollEnabled={false}
                    ListHeaderComponent={
                        <Text style={styles.listTitle}>{t("home.goal.subtasks")}:</Text>
                    }
                    ListEmptyComponent={
                        <Text>{t("home.goal.noSubtasks")}</Text>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) => (
                        <Subtask {...item} header_image={goal?.header_image || ""} onDelete={handleSubtaskDelete} />
                    )}
                />
            </ScrollView>
            <CreateGoalButton route={`/createSubtask?goal_id=${id}`} />

            {/* Settings Dropdown */}
            {showSettingsModal && (
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShowSettingsModal(false)}
                >
                    <View style={styles.dropdownContent}>
                        <TouchableOpacity
                            style={styles.dropdownOption}
                        >
                            <Text style={styles.dropdownOptionText}>{t('home.editGoal.reorder')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dropdownOption}
                            onPress={handleDeleteGoal}
                        >
                            <Text style={styles.deleteOptionText}>{t('home.goal.deleteGoal')}</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        gap: 15,
    },
    header: {
        position: "relative",
    },
    buttons: {
        position: "absolute",
        top: 55,
        right: 25,
        flexDirection: 'row',
        gap: 10
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        height: 42,
        width: 42,
    },
    starButton: {
        backgroundColor: 'white'
    },
    settingsButton: {
        backgroundColor: Colors.primary,
    },
    image: {
        height: 250,
        width: "100%",
        backgroundColor: Colors.primary
    },
    headerTitles: {
        padding: 15,
        gap: 5,
    },
    headerTitle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        maxWidth: 310,
    },
    subtitle: {
        fontSize: 16,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtasksListContainer: {
        padding: 15,
        paddingBottom: 100,
        gap: 15,
    },
    subtaskItem: {
        fontSize: 16,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    dropdownContent: {
        position: 'absolute',
        top: 97,
        right: 25,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        zIndex: 1001,
    },
    dropdownOption: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    dropdownOptionText: {
        fontSize: 16,
        color: '#333',
    },
    deleteOptionText: {
        fontSize: 16,
        color: '#ff4444',
    },
})