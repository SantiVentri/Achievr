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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        title: "",
    });

    const handleCreateGoal = async () => {
        setIsLoading(true);
        if (title.length < 4) {
            setErrors({ ...errors, title: t("home.createGoal.form.goalMinLength") });
            setIsLoading(false);
            return;
        }
        const { error } = await supabase.from("goals").insert({
            title: title,
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
        setTitle("");
        setDescription("");
        setErrors({
            title: "",
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createGoal.form.goal")}</Text>
                    <TextInput
                        style={[styles.input, errors.title && { borderColor: "red", borderWidth: 2, backgroundColor: "rgba(255, 0, 0, 0.1)" }]}
                        placeholder={t("home.createGoal.form.goalPlaceholder")}
                        placeholderTextColor="gray"
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            setErrors({ ...errors, title: "" });
                        }}
                    />
                    {errors.title && <Text style={styles.error}>{errors.title}</Text>}
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createGoal.form.description")}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t("home.createGoal.form.descriptionPlaceholder")}
                        placeholderTextColor="gray"
                        multiline
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text);
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: !title || isLoading ? 'gray' : Colors.primary }]} onPress={handleCreateGoal} disabled={!title || isLoading}>
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
        borderWidth: 2,
        borderColor: "grey",
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
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
