import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

type DangerActionType = 'delete' | 'reset';

interface DangerActionButtonProps {
    type: DangerActionType;
}

export default function DangerActionButton({ type }: DangerActionButtonProps) {
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
    };

    const handleResetUser = async () => {
        Alert.alert(
            'Reiniciar cuenta',
            '¿Estás seguro de que querés reiniciar tu cuenta? Esta acción no se puede deshacer.',
            [
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const { error } = await supabase.rpc('reset_user');

                        if (error) {
                            Alert.alert('Error', 'Hubo un error al reiniciar tu cuenta.');
                        } else {
                            Alert.alert('Cuenta reiniciada', 'Tu cuenta fue reiniciada con éxito.');
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
        <TouchableOpacity onPress={type == 'delete' ? handleDeleteUser : handleResetUser} style={styles.button}>
            <Text style={styles.buttonText}>{type == 'delete' ? 'Eliminar cuenta' : 'Reiniciar cuenta'}</Text>
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