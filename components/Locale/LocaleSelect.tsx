import { StyleSheet, View } from "react-native";
import ChangeLocale from "./locale";

export default function LocaleSelect() {
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
        gap: 10,
    },
})