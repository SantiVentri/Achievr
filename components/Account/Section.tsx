import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, TextInput as RNTextInput, StyleSheet, Text, TextInput, View } from "react-native";
import DangerActionButton from "./DangerActionButton";

type AccountSectionType = 'username' | 'email' | 'danger';

interface AccountSectionProps {
    type: AccountSectionType;
    onInputFocus?: (inputY: number) => void;
}

export default function AccountSection({ type, onInputFocus }: AccountSectionProps) {
    const { t } = useTranslation();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const inputRef = useRef<RNTextInput | null>(null);

    useEffect(() => {
        setUsername(user?.user_metadata?.display_name)
        setEmail(user?.email)
    }, [user])

    const handleChangeUsername = async () => {
        setIsLoading(true);
        if (username === user?.user_metadata?.display_name) return
        const { error } = await supabase.auth.updateUser({
            data: {
                display_name: username,
            }
        });

        if (error) {
            Alert.alert(t("common.error"), t("account.editAccount.errorMessage"));
        } else {
            Alert.alert(t("common.success"), t("account.editAccount.successMessage"));
        }
        setIsLoading(false);
    };

    const handleChangeEmail = async () => {
        setIsLoading(true);
        if (email?.toLowerCase() === user?.email) return

        const { error } = await supabase.auth.updateUser({
            email: email
        });

        if (error) {
            Alert.alert(t("common.error"), t("account.editAccount.errorMessage"));
        } else {
            Alert.alert(t("common.success"), t("account.editAccount.successMessage"));
        }
        setIsLoading(false);
    };

    const handleFocus = () => {
        if (inputRef.current && onInputFocus) {
            inputRef.current.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
                onInputFocus(py);
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t(`account.sections.${type}.title`)}</Text>
                <Text style={styles.description}>{t(`account.sections.${type}.description`)}</Text>
            </View>
            <View style={[styles.inputContainer, type === 'danger' && { backgroundColor: 'rgba(255, 0, 0, 0.2)' }]}>
                {type == 'username' && (
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        onEndEditing={handleChangeUsername}
                        onFocus={handleFocus}
                        maxLength={20}
                        placeholder={isLoading ? t('common.loading') : t('account.sections.username.placeholder')}
                        placeholderTextColor='grey'
                    />
                )}
                {type == 'email' && (
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        onEndEditing={handleChangeEmail}
                        onFocus={handleFocus}
                        maxLength={200}
                        placeholder={isLoading ? t('common.loading') : t('account.sections.email.placeholder')}
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
        borderRadius: 15,
        borderColor: "#BDBDBD",
        backgroundColor: "#F7F7F7",
        gap: 5,
        overflow: 'hidden'
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