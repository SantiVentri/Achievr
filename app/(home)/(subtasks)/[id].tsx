import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SubtaskPage() {
    const { id } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Text>Subtask {id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})