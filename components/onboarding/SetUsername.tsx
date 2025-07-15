import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface SetUsernameModalProps {
    onUsernameChange: (username: string) => void;
    initialUsername?: string;
}

export default function SetUsernameModal({ onUsernameChange, initialUsername = "" }: SetUsernameModalProps) {
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>(initialUsername);

    const handleUsernameChange = (text: string) => {
        setUsername(text);
        onUsernameChange(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titles}>
                <Text style={styles.title}>{t('onboarding.setUsername.title')}:</Text>
                <Text style={styles.description}>{t('onboarding.setUsername.description')}</Text>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.formGroupLabel}>{t("common.username")}:</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={handleUsernameChange}
                    placeholder={t("common.usernamePlaceholder")}
                    placeholderTextColor="gray"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        width: '100%'
    },
    titles: {
        gap: 5
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    description: {
        opacity: 0.8
    },
    formGroup: {
        gap: 10,
    },
    formGroupLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        padding: 10,
    },
})