import { Colors } from "@/constants/palette";
import { SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Subtask({ id, title, short_description, is_done, header_image }: SubtaskType & { header_image: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(is_done);
    const router = useRouter();

    const handlePress = () => {
        setIsLoading(true);
        router.push({
            pathname: "/(drawer)/(home)/(subtasks)/[id]",
            params: { id, header_image }
        });
        setIsLoading(false);
    }

    const handleCheckboxPress = async (event: GestureResponderEvent) => {
        setIsLoading(true);
        event.stopPropagation();
        await supabase.from("subtasks").update({ is_done: !isDone }).eq("id", id);
        setIsDone(!isDone);
        setIsLoading(false);
    }

    return (
        <TouchableOpacity onPress={handlePress} disabled={isLoading}>
            <View style={[styles.container, isDone && styles.is_done]}>
                <TouchableOpacity onPress={handleCheckboxPress} disabled={isLoading}>
                    <MaterialCommunityIcons name={isDone ? "checkbox-marked" : "checkbox-blank-outline"} size={26} color={Colors.primary} />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text style={[styles.title, isDone && styles.is_done_text]}>{title}</Text>
                    <Text style={[styles.description, isDone && styles.is_done_text]}>{short_description}</Text>
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
        padding: 14,
        gap: 10
    },
    content: {
        flex: 1,
        gap: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
    },
    is_done: {
        backgroundColor: "rgba(52, 84, 209, 0.3)",
    },
    is_done_text: {
        textDecorationLine: "line-through",
    },
})