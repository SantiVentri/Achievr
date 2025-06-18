import { Colors } from "@/constants/palette";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function CreateGoalButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRouter = () => {
        setIsLoading(true);
        router.push("/createGoal");
        setIsLoading(false);
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: isLoading ? "gray" : Colors.primary }]} onPress={handleRouter} disabled={isLoading}>
            <Entypo name="plus" size={45} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 55,
        right: 40,
        backgroundColor: Colors.primary,
        borderRadius: 100,
        padding: 10,
    },
});
