import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FormSubtask({ goal_id }: { goal_id: string }) {
    const { user } = useUser();
    const { t } = useTranslation();
    const router = useRouter();
    const [subtask, setSubtask] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateGoal = async () => {
        setIsLoading(true);
        const { error } = await supabase.from("subtasks").insert({
            title: subtask,
            short_description: description,
            creator_id: user?.id,
            goal_id: goal_id,
        });
        if (error) {
            Alert.alert(t("home.createGoal.error"), t("home.createGoal.errorMessage"));
        } else {
            Alert.alert(t("home.createGoal.success"), t("home.createGoal.successMessage"));
        }
        resetForm();
        router.back();
        setIsLoading(false);
    }

    const resetForm = () => {
        setSubtask("");
        setDescription("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createSubtask.form.subtask")}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t("home.createSubtask.form.subtaskPlaceholder")}
                        placeholderTextColor="gray"
                        value={subtask}
                        onChangeText={setSubtask}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createSubtask.form.description")}</Text>
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
            <TouchableOpacity style={[styles.button, { backgroundColor: !subtask || !description || isLoading ? 'gray' : Colors.primary }]} onPress={handleCreateGoal} disabled={!subtask || !description || isLoading}>
                <Text style={styles.buttonText}>{isLoading ? t("home.createSubtask.form.button.loading") : t("home.createSubtask.form.button.create")}</Text>
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
});
