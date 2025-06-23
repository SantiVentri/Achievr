import { SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, GestureResponderEvent, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SubtaskScreen() {
    const { id, header_image } = useLocalSearchParams();
    const { t } = useTranslation();
    const router = useRouter();
    const [subtask, setSubtask] = useState<SubtaskType>();
    const [refreshing, setRefreshing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllData = useCallback(async () => {
        if (!id) return;

        const { data: subtaskData, error } = await supabase.from("subtasks").select("*").eq("id", id).single();
        if (error) {
            console.error(error);
            return;
        }
        setSubtask(subtaskData);
        setIsDone(subtaskData?.is_done || false);

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
        Alert.alert(t("home.subtask.deleteSubtask"), t("home.subtask.deleteSubtaskMessage"), [
            {
                text: t("home.subtask.deleteSubtask"), onPress: async () => {
                    await supabase.from("subtasks").delete().eq("id", id);
                    router.back();
                },
                style: "destructive"
            },
            { text: t("common.cancel") }
        ]);
        setIsDeleting(false);
    }, [id]);

    const handleCheckboxPress = useCallback(async (event: GestureResponderEvent) => {
        event?.stopPropagation();
        setIsDone(!isDone);
        await supabase.from("subtasks").update({ is_done: !isDone }).eq("id", id);
    }, [id, isDone]);

    const handleRouter = useCallback(() => {
        setIsLoading(true);
        router.push({
            pathname: "/editSubtask",
            params: {
                subtask_id: id as string,
            }
        });
        setIsLoading(false);
    }, [id]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.headerContainer}>
                    <Pressable style={styles.header} onPress={handleRouter} disabled={isLoading}>
                        <Image
                            source={{ uri: header_image as string }}
                            style={styles.image}
                        />
                        <View style={styles.headerTitles}>
                            <View style={styles.headerTitle}>
                                <Pressable onPress={handleCheckboxPress}>
                                    {isDone ? <MaterialCommunityIcons name="checkbox-marked-circle" size={28} color="green" /> : <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={28} color="black" />}
                                </Pressable>
                                <Text style={[styles.title, { textDecorationLine: isDone ? "line-through" : "none" }]}>{subtask?.title}</Text>
                            </View>
                            <Text style={[styles.subtitle, { textDecorationLine: isDone ? "line-through" : "none" }]}>{subtask?.short_description}</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteGoal} disabled={isDeleting}>
                            <FontAwesome name="trash" size={30} color="red" />
                        </TouchableOpacity>
                    </Pressable>
                </View>
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
    headerTitle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
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