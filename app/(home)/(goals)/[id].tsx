import { getSubtasks } from "@/components/data";
import Subtask from "@/components/Subtask";
import { SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GoalScreen() {
    const { id } = useLocalSearchParams();
    const [goal, setGoal] = useState<any | null>(null);
    const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchAllData = useCallback(async () => {
        if (!id) return;

        const { data: goalData, error } = await supabase.from("goals").select("*").eq("id", id).single();
        if (error) {
            console.error(error);
            return;
        }
        setGoal(goalData);

        if (goalData) {
            const subtasksData = await getSubtasks(goalData.id);
            setSubtasks(subtasksData);
        }
    }, [id]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchAllData();
        setRefreshing(false);
    }, [fetchAllData]);

    const handleDeleteGoal = useCallback(async () => {
        setIsDeleting(true);
        Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
            {
                text: "Delete", onPress: async () => {
                    await supabase.from("goals").delete().eq("id", id);
                    router.push("/");
                },
                style: "destructive"
            },
            { text: "Cancel" }
        ]);
        setIsDeleting(false);
    }, [id]);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: goal?.header_image }}
                            style={styles.image}
                        />
                        <View style={styles.headerTitles}>
                            <Text style={styles.title}>{goal?.title}</Text>
                            <Text style={styles.subtitle}>{goal?.short_description}</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteGoal} disabled={isDeleting}>
                            <FontAwesome name="trash" size={30} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={subtasks}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.subtasksListContainer}
                    scrollEnabled={false}
                    ListHeaderComponent={
                        <Text style={styles.listTitle}>Subtasks:</Text>
                    }
                    ListEmptyComponent={
                        <Text>No subtasks yet</Text>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) => (
                        <Subtask {...item} />
                    )}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        gap: 15,
    },
    header: {
        position: "relative",
    },
    deleteButton: {
        position: "absolute",
        top: 55,
        right: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FBD6D3",
        borderWidth: 3,
        borderColor: "red",
        borderRadius: 8,
        height: 42,
        width: 42,
    },
    image: {
        height: 250,
        width: "100%",
        filter: "brightness(0.7)",
    },
    headerTitles: {
        padding: 15,
        gap: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtasksListContainer: {
        padding: 15,
        paddingBottom: 100,
        gap: 15,
    },
    subtaskItem: {
        fontSize: 16,
    },
})