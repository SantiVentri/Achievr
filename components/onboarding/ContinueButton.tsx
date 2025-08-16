import { Colors } from "@/constants/palette";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ContinueButtonProps {
    onPress: () => void;
    text: "onboarding.button.continue" | "onboarding.button.finishSetup";
    disabled?: boolean;
}

export default function ContinueButton({ onPress, text, disabled }: ContinueButtonProps) {
    const { t } = useTranslation();
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: disabled ? "#d9d9d9" : Colors.primary, }]} onPress={onPress} disabled={disabled}>
            <Text style={styles.text}>{t(text)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 70,
        paddingVertical: 16,
        width: "100%",
        borderRadius: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});