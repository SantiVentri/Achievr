import FormAI from "@/components/FormAI";
import FormManual from "@/components/FormManual";
import { Colors } from "@/constants/palette";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CreateGoalScreen() {
    const { t } = useTranslation();
    const [mode, setMode] = useState<"ai" | "manual">("ai");
    const [isLoading, setIsLoading] = useState(false);

    const handleModeChange = (mode: "ai" | "manual") => {
        setIsLoading(true);
        setMode(mode);
        setIsLoading(false);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("home.createGoal.title")}</Text>
                <Text style={styles.subtitle}>{t("home.createGoal.subtitle")}</Text>
            </View>
            <View style={styles.modeButtons}>
                <Pressable onPress={() => handleModeChange("ai")} disabled={isLoading}>
                    <Text style={[styles.button, mode === "ai" && styles.activeButton]}>{t("home.createGoal.ai")}</Text>
                </Pressable>
                <Pressable onPress={() => handleModeChange("manual")} disabled={isLoading}>
                    <Text style={[styles.button, mode === "manual" && styles.activeButton]}>{t("home.createGoal.manual")}</Text>
                </Pressable>
            </View>
            {mode === "ai" && <FormAI />}
            {mode === "manual" && <FormManual />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 25,
        gap: 25,
    },
    header: {
        alignItems: "center",
        gap: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        color: "gray",
    },
    modeButtons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    button: {
        fontSize: 16,
        fontWeight: "bold",
        borderWidth: 3,
        borderColor: Colors.primary,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        color: Colors.primary,
    },
    activeButton: {
        backgroundColor: Colors.primary,
        color: "white",
    },
});