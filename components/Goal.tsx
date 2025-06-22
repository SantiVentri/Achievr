import { Colors } from "@/constants/palette";
import { GoalType } from "@/enums/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Goal({ id, icon, title, short_description, is_done }: GoalType) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = () => {
        setIsLoading(true);
        router.push({
            pathname: "/(drawer)/(home)/(goals)/[id]",
            params: { id }
        });
        setIsLoading(false);
    }

    return (
        <TouchableOpacity style={[styles.container, is_done && styles.is_done]} onPress={handlePress} disabled={isLoading}>
            <Image source={{ uri: icon }} style={styles.image} />
            <View style={styles.content}>
                <Text style={[styles.title, is_done && styles.is_done_text]}>{title}</Text>
                <Text style={[styles.description, is_done && styles.is_done_text]} numberOfLines={3}>{short_description}</Text>
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
        minHeight: 110,
        gap: 15,
        marginBottom: 15,
    },
    is_done: {
        backgroundColor: "rgba(52, 84, 209, 0.3)",
    },
    is_done_text: {
        textDecorationLine: "line-through",
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    content: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
    },
});