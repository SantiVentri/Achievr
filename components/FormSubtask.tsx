import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getSubtasks } from "./data";

export default function FormSubtask({ goal_id }: { goal_id: string }) {
    const { user } = useUser();
    const { t } = useTranslation();
    const router = useRouter();
    const [subtask, setSubtask] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        subtask: "",
    });

    const handleCreateGoal = async () => {
        setIsLoading(true);
        if (subtask.length < 4) {
            setErrors({ ...errors, subtask: t("home.createSubtask.form.subtaskMinLength") });
            setIsLoading(false);
            return;
        }
        const subtasks = await getSubtasks(goal_id);
        const maxStep = subtasks.length > 0 ? Math.max(...subtasks.map(s => s.step)) : 0;
        const { error } = await supabase.from("subtasks").insert({
            title: subtask,
            short_description: description || null,
            creator_id: user?.id,
            step: maxStep + 1,
            goal_id: goal_id,
        });
        if (error) {
            Alert.alert(t("common.error"), t('home.createSubtask.errorMessage'));
        } else {
            Alert.alert(t("common.success"), t("home.createSubtask.successMessage"));
        }
        resetForm();
        router.back();
        setIsLoading(false);
    }

    const resetForm = () => {
        setSubtask("");
        setDescription("");
        setErrors({
            subtask: "",
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createSubtask.form.subtask")}</Text>
                    <TextInput
                        style={[styles.input, errors.subtask && { borderColor: "red", borderWidth: 2, backgroundColor: "rgba(255, 0, 0, 0.1)" }]}
                        placeholder={t("home.createSubtask.form.subtaskPlaceholder")}
                        placeholderTextColor="gray"
                        value={subtask}
                        onChangeText={(text) => {
                            setSubtask(text);
                            setErrors({ ...errors, subtask: "" });
                        }}
                    />
                    {errors.subtask && <Text style={styles.error}>{errors.subtask}</Text>}
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("common.description")}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t("home.createSubtask.form.descriptionPlaceholder")}
                        placeholderTextColor="gray"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: !subtask || isLoading ? 'gray' : Colors.primary }]} onPress={handleCreateGoal} disabled={!subtask || isLoading}>
                <Text style={styles.buttonText}>{isLoading ? t("common.loading") : t("common.create")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 25,
    },
    form: {
        gap: 25,
    },
    formGroup: {
        gap: 10,
    },
    formGroupTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderRadius: 10,
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 100,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    error: {
        color: "red",
        fontSize: 12,
    },
});
