import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function DeleteAccountButton() {
    const { t } = useTranslation();
    const router = useRouter();
    const handleDeleteUser = async () => {
        Alert.alert(
            'Eliminar cuenta',
            '¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.',
            [
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const { error } = await supabase.rpc('delete_user');

                        if (error) {
                            console.error('Error al eliminar usuario:', error.message);
                            Alert.alert('Error', 'Hubo un error al eliminar tu cuenta.');
                        } else {
                            Alert.alert('Cuenta eliminada', 'Tu cuenta fue eliminada con éxito.');
                            await supabase.auth.signOut();
                        }
                    },
                },
                {
                    text: 'Cancelar',
                },
            ]
        );
    }

    return (
        <TouchableOpacity onPress={handleDeleteUser} style={styles.button}>
            <Text style={styles.buttonText}>Eliminar cuenta</Text>
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