import { Colors } from "@/constants/palette";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ChangeLocale from "./locale";

export default function LocaleSelect() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.textContainer}>
                <Text style={styles.text}>{t("account.locale.languages")}</Text>
                <Feather name="chevron-down" size={24} color="white" style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }} />
            </Pressable>
            {isOpen && (
                <View style={styles.localeContainer}>
                    <ChangeLocale locale="en" />
                    <ChangeLocale locale="es" />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 5,
        borderRadius: 10,
    },
    text: {
        gap: 10,
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    localeContainer: {
        position: "absolute",
        top: '100%',
        right: 0,
        left: 0,
        padding: 10,
        gap: 10,
    },
})