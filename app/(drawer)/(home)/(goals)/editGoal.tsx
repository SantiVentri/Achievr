import { getGoal } from "@/components/data";
import EditGoalHeader from "@/components/EditGoalHeader";
import EditGoalIcon from "@/components/EditGoalIcon";
import { Colors } from "@/constants/palette";
import { GoalType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditGoalScreen() {
    const { goal_id } = useLocalSearchParams();
    const router = useRouter();
    const { t } = useTranslation();
    const scrollViewRef = useRef<ScrollView>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [goal, setGoal] = useState<GoalType | null>(null);

    useEffect(() => {
        setIsTitleValid(title.length > 4 && title.length < 50);
    }, [title]);

    useEffect(() => {
        setIsDescriptionValid(description.length < 100);
    }, [description]);

    useEffect(() => {
        if (goal) {
            const titleChanged = title !== goal.title;
            const descriptionChanged = description !== goal.short_description;
            setHasChanges(titleChanged || descriptionChanged);
        }
    }, [title, description, goal]);

    useFocusEffect(useCallback(() => {
        const fetchGoal = async () => {
            const goal = await getGoal(goal_id as string);
            if (goal) {
                setTitle(goal.title || '');
                setDescription(goal.short_description || '');
                setGoal(goal);
            } else {
                router.back();
            }
        }
        fetchGoal();
    }, [goal_id]));

    const handleSave = async () => {
        setIsLoading(true);
        const { error } = await supabase.from("goals").update({ title, short_description: description }).eq("id", goal_id);
        setIsLoading(false);

        if (error) {
            Alert.alert(t("common.error"), t("home.editGoal.errorMessage"));
        } else {
            Alert.alert(t("common.success"), t("home.editGoal.successMessage"), [
                { text: t("common.ok"), onPress: () => router.back() }
            ]);
        }
    }

    const handleInputFocus = () => {
        // Scroll to bottom when description input is focused
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 20}
        >
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={styles.container}>
                    <Text style={styles.formTitle}>{t("home.editGoal.title")}</Text>
                    <View style={styles.form}>
                        <View style={styles.formEditHeader}>
                            <Text style={styles.formGroupLabel}>{t("home.editGoal.headerImage")}:</Text>
                            <EditGoalHeader id={goal_id as string} header_image={goal?.header_image || ''} />
                        </View>
                        <View style={styles.formEditHeader}>
                            <Text style={styles.formGroupLabel}>{t("home.editGoal.iconImage")}:</Text>
                            <EditGoalIcon id={goal_id as string} icon_name={goal?.icon || ''} />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.formGroupLabel}>{t("home.editGoal.title")}:</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder={t("home.editGoal.titlePlaceholder")}
                                placeholderTextColor="gray"
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.formGroupLabel}>{t("home.editGoal.description")}:</Text>
                            <TextInput
                                style={[styles.input, styles.multilineInput]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder={t("home.editGoal.descriptionPlaceholder")}
                                placeholderTextColor="gray"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                onFocus={handleInputFocus}
                            />
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                {
                                    backgroundColor: isLoading || !isTitleValid || !isDescriptionValid || !hasChanges
                                        ? "gray"
                                        : Colors.primary
                                }
                            ]}
                            onPress={handleSave}
                            disabled={isLoading || !isTitleValid || !isDescriptionValid || !hasChanges}
                        >
                            <Text style={styles.saveButtonText}>
                                {isLoading ? t("common.loading") : t("common.save")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 25,
        gap: 30,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    formSubtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    form: {
        alignItems: "flex-start",
        gap: 20,
    },
    formEditHeader: {
        gap: 10,
    },
    editAvatar: {
        position: "relative",
        outlineWidth: 4,
        outlineColor: Colors.primary,
        outlineStyle: "solid",
        outlineOffset: -1,
        borderRadius: 100,
        alignItems: "flex-start",
        gap: 10,
    },
    editAvatarButton: {
        position: "absolute",
        bottom: -5,
        right: -5,
        outlineWidth: 3,
        outlineColor: "white",
        outlineStyle: "solid",
        backgroundColor: Colors.primary,
        borderRadius: 100,
        padding: 8,
    },
    formGroup: {
        width: "100%",
        gap: 5,
    },
    formGroupLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        padding: 10,
        minHeight: 45,
    },
    multilineInput: {
        minHeight: 100,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        width: "100%",
    },
    saveButtonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
});