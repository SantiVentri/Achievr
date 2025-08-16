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
            t('account.sections.danger.deleteTitle'),
            t('account.sections.danger.deleteMessage'),
            [
                {
                    text: t('account.sections.danger.delete'),
                    style: 'destructive',
                    onPress: async () => {
                        const { error } = await supabase.rpc('delete_user');

                        if (error) {
                            console.error('Error al eliminar usuario:', error.message);
                            Alert.alert(t('common.error'), t('account.sections.danger.deleteError'));
                        } else {
                            Alert.alert(t('account.sections.danger.deleteTitle'), t('account.sections.danger.deleteSuccess'));
                            await supabase.auth.signOut();
                        }
                    },
                },
                {
                    text: t('common.cancel'),
                },
            ]
        );
    };

    const handleResetUser = async () => {
        Alert.alert(
            t('account.sections.danger.resetTitle'),
            t('account.sections.danger.resetMessage'),
            [
                {
                    text: t('account.sections.danger.reset'),
                    style: 'destructive',
                    onPress: async () => {
                        const { error } = await supabase.rpc('reset_user');

                        if (error) {
                            Alert.alert(t('common.error'), t('account.sections.danger.resetError'));
                        } else {
                            Alert.alert(t('account.sections.danger.resetTitle'), t('account.sections.danger.resetSuccess'));
                            await supabase.auth.signOut();
                        }
                    },
                },
                {
                    text: t('common.cancel'),
                },
            ]
        );
    }

    return (
        <TouchableOpacity onPress={type == 'delete' ? handleDeleteUser : handleResetUser} style={styles.button}>
            <Text style={styles.buttonText}>{type == 'delete' ? t('account.sections.danger.deleteTitle') : t('account.sections.danger.resetTitle')}</Text>
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