import { Colors } from "@/constants/palette";
import { SubtaskType } from "@/enums/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { getSubtasks } from "./data";

export default function ReorderSubtasksModal(props: { goal_id: string }) {
    const { t } = useTranslation();
    const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchSubtasks() {
        setIsLoading(true);
        const data = await getSubtasks(props.goal_id);
        setSubtasks(data);
        setIsLoading(false);
    }

    function onRefresh() {
        setRefreshing(true);
        fetchSubtasks();
        setRefreshing(false);
    }

    useEffect(() => {
        fetchSubtasks()
    }, [props.goal_id])

    return (
        <View style={styles.container}>
            <FlatList
                data={subtasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={() => (
                    <Text style={styles.title}>{t('home.goal.subtasks')}</Text>
                )}
                ListEmptyComponent={() => (
                    <Text>{!isLoading && (!subtasks || subtasks.length == 0) && t('home.goal.noSubtasks')}</Text>
                )}
                renderItem={({ item }) => (
                    <Pressable style={styles.item}>
                        <Text style={{ color: '#000' }}>{item.title}</Text>
                        <MaterialCommunityIcons name="drag-horizontal" size={24} color={Colors.primary} />
                    </Pressable>
                )}
                refreshControl={
                    <RefreshControl tintColor='rgb(103, 103, 103)' refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        maxHeight: 550,
        minWidth: '90%',
    },
    listContainer: {
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    }
})