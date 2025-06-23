import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function EditGoal() {
    const { goal_id } = useLocalSearchParams();
    return <View style={styles.container}>
        <Text>Edit Goal</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
});