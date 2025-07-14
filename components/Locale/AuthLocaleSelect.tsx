import { StyleSheet, View } from "react-native";
import ChangeLocale from "./locale";

export default function AuthLocaleSelect() {
    return (
        <View style={styles.container}>
            <ChangeLocale locale="es" size={35} />
            <ChangeLocale locale="en" size={35} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: '100%',
        gap: 10,
    },
})