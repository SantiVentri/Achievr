import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Account</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
})