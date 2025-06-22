import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FormManual() {
    const { user } = useUser();
    const { t } = useTranslation();
    const router = useRouter();
    const [goal, setGoal] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateGoal = async () => {
        setIsLoading(true);
        const { error } = await supabase.from("goals").insert({
            title: goal,
            short_description: description,
            creator_id: user?.id,
            ai: false,
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
        setGoal("");
        setDescription("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createGoal.form.goal")}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t("home.createGoal.form.goalPlaceholder")}
                        placeholderTextColor="gray"
                        value={goal}
                        onChangeText={setGoal}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createGoal.form.description")}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t("home.createGoal.form.descriptionPlaceholder")}
                        placeholderTextColor="gray"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: !goal || !description || isLoading ? 'gray' : Colors.primary }]} onPress={handleCreateGoal} disabled={!goal || !description || isLoading}>
                <Text style={styles.buttonText}>{isLoading ? t("home.createGoal.button.loading") : t("home.createGoal.button.create")}</Text>
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
