import { Colors } from "@/constants/palette";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FormAI() {
    const { t } = useTranslation();
    const scrollViewRef = useRef<ScrollView>(null);
    const [goal, setGoal] = useState("");
    const [steps, setSteps] = useState<number>(10);
    const [experience, setExperience] = useState<string>(t('home.createGoal.form.beginner'));
    const [extraInfo, setExtraInfo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        goal: "",
        extraInfo: "",
    });

    const handleCreateGoal = async () => {
        setIsLoading(true);
        if (goal.length < 4) {
            setErrors({ ...errors, goal: t("home.createGoal.form.goalMinLength") });
            setIsLoading(false);
            return;
        }
        if (extraInfo.length > 0 && extraInfo.length < 10) {
            setErrors({ ...errors, extraInfo: t("home.createGoal.form.extraInfoMinLength") });
            setIsLoading(false);
            return;
        }
        resetForm();
        setIsLoading(false);
    }

    const resetForm = () => {
        setGoal("");
        setExtraInfo("");
        setErrors({
            goal: "",
            extraInfo: "",
        });
    }

    const handleInputFocus = () => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    const stepsOptions = [5, 10, 20];
    const experienceOptions = [t('home.createGoal.form.beginner'), t('home.createGoal.form.basic'), t('home.createGoal.form.intermediate'), t('home.createGoal.form.advanced')];

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
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.formGroupTitle}>{t("home.createGoal.form.goal")}</Text>
                            <TextInput
                                style={[styles.input, errors.goal && { borderColor: "red", borderWidth: 2, backgroundColor: "rgba(255, 0, 0, 0.1)" }]}
                                placeholder={t("home.createGoal.form.goalPlaceholder")}
                                placeholderTextColor="gray"
                                value={goal}
                                maxLength={30}
                                onChangeText={(text) => {
                                    setGoal(text);
                                    setErrors({ ...errors, goal: "" });
                                }}
                            />
                            {errors.goal && <Text style={styles.error}>{errors.goal}</Text>}
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
                                        onPress={() => {
                                            setSteps(option);
                                        }}
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
                            <Text style={styles.formGroupTitle}>{t("home.createGoal.form.experienceTitle")}</Text>
                            <ScrollView horizontal contentContainerStyle={{ paddingVertical: 5, gap: 10 }}>
                                {experienceOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.option,
                                            experience === option && { backgroundColor: Colors.primary }
                                        ]}
                                        onPress={() => {
                                            setExperience(option);
                                        }}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            experience === option && { color: 'white' }
                                        ]}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.formGroupTitle}>{t("home.createGoal.form.extraInfoTitle")}</Text>
                            <TextInput
                                style={[styles.input, { minHeight: 120 }, errors.extraInfo && { borderColor: "red", borderWidth: 2, backgroundColor: "rgba(255, 0, 0, 0.1)" }]}
                                placeholder={t("home.createGoal.form.extraInfoPlaceholder")}
                                placeholderTextColor="gray"
                                multiline
                                textAlignVertical="top"
                                value={extraInfo}
                                maxLength={180}
                                onFocus={handleInputFocus}
                                onChangeText={(text) => {
                                    setExtraInfo(text);
                                    setErrors({ ...errors, extraInfo: "" });
                                }}
                            />
                            {errors.extraInfo && <Text style={styles.error}>{errors.extraInfo}</Text>}
                            <Text style={extraInfo.length == 180 && { color: 'red' }}>{extraInfo.length} / 180</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: !goal || steps === null || experience === null || isLoading ? 'gray' : Colors.primary }]}
                        onPress={handleCreateGoal}
                        disabled={!goal || steps === null || experience === null || isLoading}
                    >
                        <Text style={styles.buttonText}>{isLoading ? t("common.loading") : t("home.createGoal.createGoal")}</Text>
                    </TouchableOpacity>
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
    error: {
        color: "red",
        fontSize: 12,
    },
});
