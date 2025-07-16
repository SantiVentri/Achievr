import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DangerActionButton from "./DangerActionButton";

type AccountSectionType = 'username' | 'email' | 'danger';

interface AccountSectionProps {
    type: AccountSectionType;
}

export default function AccountSection({ type }: AccountSectionProps) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t(`account.sections.${type}.title`)}</Text>
                <Text style={styles.description}>{t(`account.sections.${type}.description`)}</Text>
            </View>
            <View style={[styles.inputContainer, type === 'danger' && { backgroundColor: 'rgba(255, 0, 0, 0.2)' }]}>
                {type == 'username' && (
                    <TextInput
                        style={styles.input}
                        placeholder={t('account.sections.username.placeholder')}
                        placeholderTextColor='grey'
                    />
                )}
                {type == 'email' && (
                    <TextInput
                        style={styles.input}
                        placeholder={t('account.sections.email.placeholder')}
                        placeholderTextColor='grey'
                    />
                )}
                {type === 'danger' && <DangerActionButton type="reset" />}
                {type === 'danger' && <DangerActionButton type="delete" />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#BDBDBD",
        backgroundColor: "#F7F7F7",
        gap: 5
    },
    header: {
        padding: 12,
        gap: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        opacity: 0.8
    },
    inputContainer: {
        padding: 12,
        gap: 10
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        fontSize: 16,
        padding: 10,
    }
})