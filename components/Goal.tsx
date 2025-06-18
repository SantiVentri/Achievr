import { GoalType } from "@/types/interfaces";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Goal({ id, title, short_description, creator }: GoalType) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handlePress = () => {
        setIsLoading(true);
        router.push({
            pathname: "/(home)/[id]",
            params: { id }
        });
        setIsLoading(false);
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} disabled={isLoading}>
            <Text>{title}</Text>
            <Text>{short_description}</Text>
            <Text>{creator}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4",
        width: "100%",
        height: 100,
    },
});