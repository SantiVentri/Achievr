import { getSubtask } from "@/components/data";
import { Colors } from "@/constants/palette";
import { SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditSubtaskScreen() {
    const { subtask_id } = useLocalSearchParams();
    const router = useRouter();
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [subtask, setSubtask] = useState<SubtaskType | null>(null);

    useEffect(() => {
        setIsTitleValid(title.length > 4 && title.length < 50);
    }, [title]);

    useEffect(() => {
        setIsDescriptionValid(description.length < 100);
    }, [description]);

    useEffect(() => {
        if (subtask) {
            const titleChanged = title !== subtask.title;
            const descriptionChanged = description !== subtask.short_description;
            setHasChanges(titleChanged || descriptionChanged);
        }
    }, [title, description, subtask]);

    useEffect(() => {
        const fetchSubtask = async () => {
            const subtask = await getSubtask(subtask_id as string);
            if (subtask) {
                setTitle(subtask.title || '');
                setDescription(subtask.short_description || '');
                setSubtask(subtask);
            } else {
                router.back();
            }
        }
        fetchSubtask();
    }, [subtask_id]);

    const handleSave = async () => {
        setLoading(true);
        const { error } = await supabase.from("subtasks").update({ title, short_description: description }).eq("id", subtask_id);
        setLoading(false);

        if (error) {
            Alert.alert(t("common.error"), t("home.editSubtask.errorMessage"));
        } else {
            Alert.alert(t("common.success"), t("home.editSubtask.successMessage"), [
                { text: t("common.ok"), onPress: () => router.back() }
            ]);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>{t("home.editSubtask.title")}</Text>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupLabel}>{t("home.editSubtask.title")}:</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder={t("home.editSubtask.titlePlaceholder")}
                        placeholderTextColor="gray"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupLabel}>{t("common.description")}:</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder={t("home.editSubtask.descriptionPlaceholder")}
                        placeholderTextColor="gray"
                        multiline
                        numberOfLines={4}
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
                        {isLoading ? t("home.editSubtask.loading") : t("common.save")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
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