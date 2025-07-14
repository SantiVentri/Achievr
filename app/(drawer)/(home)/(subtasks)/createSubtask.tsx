import FormSubtask from "@/components/Subtask/FormSubtask";
import { Colors } from "@/constants/palette";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CreateSubtaskScreen() {
    const { t } = useTranslation();
    const { goal_id } = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("home.createSubtask.title")}</Text>
                <Text style={styles.subtitle}>{t("home.createSubtask.subtitle")}</Text>
            </View>
            <FormSubtask goal_id={goal_id as string} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
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