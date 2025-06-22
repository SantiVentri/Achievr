import { Colors } from "@/constants/palette";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateGoalScreen() {
    const { t } = useTranslation();
    const [goal, setGoal] = useState("");
    const [steps, setSteps] = useState<number | null>(null);
    const [hours, setHours] = useState<number | null>(null);
    const [extraInfo, setExtraInfo] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateGoal = async () => {
        setIsLoading(true);

        resetForm();
        setIsLoading(false);
    }

    const resetForm = () => {
        setGoal("");
        setSteps(null);
        setHours(null);
        setExtraInfo("");
    }

    const stepsOptions = [5, 10, 20];
    const hoursOptions = [1, 3, 5, 7];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <Text style={styles.title}>{t("home.createGoal.title")}</Text>
                <Text style={styles.subtitle}>{t("home.createGoal.subtitle")}</Text>
            </View>
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
                    <Text style={styles.formGroupTitle}>{t("home.createGoal.form.stepsTitle")}</Text>
                    <ScrollView horizontal contentContainerStyle={{ paddingVertical: 5, gap: 10 }}>
                        {stepsOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.option,
                                    steps === option && { backgroundColor: Colors.primary }
                                ]}
                                onPress={() => setSteps(option)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    steps === option && { color: 'white' }
                                ]}>{option} {t("home.createGoal.form.steps")}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createGoal.form.hoursTitle")}</Text>
                    <ScrollView horizontal contentContainerStyle={{ paddingVertical: 5, gap: 10 }}>
                        {hoursOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.option,
                                    hours === option && { backgroundColor: Colors.primary }
                                ]}
                                onPress={() => setHours(option)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    hours === option && { color: 'white' }
                                ]}>{option}-{option + 1} {t("home.createGoal.form.hours")}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>{t("home.createGoal.form.extraInfoTitle")}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t("home.createGoal.form.extraInfoPlaceholder")}
                        placeholderTextColor="gray"
                        multiline
                        value={extraInfo}
                        onChangeText={setExtraInfo}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: !goal || steps === null || hours === null || isLoading ? 'gray' : Colors.primary }
                ]}
                onPress={handleCreateGoal}
                disabled={!goal || steps === null || hours === null || isLoading}
            >
                <Text style={styles.buttonText}>{isLoading ? t("home.createGoal.button.loading") : t("home.createGoal.button.create")}</Text>
            </TouchableOpacity>
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
    option: {
        borderWidth: 3,
        borderColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
    },
    optionText: {
        color: Colors.primary,
        fontWeight: "bold",
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