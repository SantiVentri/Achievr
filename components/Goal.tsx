import { Colors } from "@/constants/palette";
import { GoalType } from "@/enums/types";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getProgress } from "./data";

export default function Goal({ id, icon, title, short_description, is_done }: GoalType) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalTasks, setTotalTasks] = useState(0);
    const [progress, setProgress] = useState(0);

    const handlePress = () => {
        setIsLoading(true);
        router.push({
            pathname: "/(drawer)/(home)/(goals)/[id]",
            params: { id }
        });
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        const fetchProgress = async () => {
            const progress = await getProgress(id);
            if (progress) {
                setTotalTasks(progress.total);
                setProgress(Math.round((progress.completed / progress.total) * 100));
            }
        }
        fetchProgress();
    }, [id]));

    return (
        <TouchableOpacity style={[styles.container, is_done && styles.is_done]} onPress={handlePress} disabled={isLoading}>
            <Text style={styles.icon}>{icon}</Text>
            <View style={styles.content}>
                <View style={styles.text_container}>
                    <Text style={[styles.title, is_done && styles.is_done_text]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                    <Text style={[styles.description, is_done && styles.is_done_text]} numberOfLines={3} ellipsizeMode="tail">{short_description}</Text>
                </View>
                <View style={styles.progress}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{`${progress}%`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#F4F4F4",
        borderWidth: 4,
        borderColor: Colors.primary,
        borderRadius: 15,
        padding: 15,
        gap: 15,
        marginBottom: 15,
    },
    is_done: {
        backgroundColor: "#BCC6EB",
    },
    is_done_text: {
        textDecorationLine: "line-through",
    },
    icon: {
        fontSize: 40,
    },
    content: {
        flex: 1,
        gap: 12,
    },
    text_container: {
        gap: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
    },
    progress: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    progressBar: {
        flex: 1,
        height: 10,
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
    },
    progressBarFill: {
        height: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
    progressText: {
        fontSize: 12,
        fontWeight: "bold",
    },
});