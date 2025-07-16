import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SignOutButton() {
    const { t } = useTranslation();
    const router = useRouter();
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.replace("/(auth)/signin");
    }

    return (
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>{t("auth.signout")}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "red",
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 10,
        padding: 10,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})