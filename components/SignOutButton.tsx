import { supabase } from "@/utils/supabase";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SignOutButton() {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    }

    return (
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 10,
        padding: 10,
        width: "100%",
    },
    buttonText: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    },
})