import { Colors } from "@/constants/palette";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateGoalScreen() {
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
                <Text style={styles.title}>Set your next big goal</Text>
                <Text style={styles.subtitle}>Complete the form and start your journey!</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>What is your goal?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g. "Learn Python", "Lose 5kg", "Start a business"'
                        placeholderTextColor="gray"
                        value={goal}
                        onChangeText={setGoal}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>How many steps to achieve?</Text>
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
                                ]}>{option} Steps</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>How many hours per week can you dedicate?</Text>
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
                                ]}>{option}-{option + 1} hours</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupTitle}>Any extra info to help the AI?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'e.g. "I already know the basics", "I\'m on a tight budget", "Weekends only"'}
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
                <Text style={styles.buttonText}>{isLoading ? 'Creating...' : 'Create Goal'}</Text>
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
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
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