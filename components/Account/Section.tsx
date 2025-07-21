import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert, TextInput as RNTextInput, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DangerActionButton from "./DangerActionButton";

type AccountSectionType = 'username' | 'email' | 'danger';

interface AccountSectionProps {
    type: AccountSectionType;
    onInputFocus?: (inputY: number) => void;
}

export default function AccountSection({ type, onInputFocus }: AccountSectionProps) {
    const { t } = useTranslation();
    const { user } = useUser();
    const [isUsernameLoading, setIsUsernameLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const inputRef = useRef<RNTextInput | null>(null);

    useEffect(() => {
        setUsername(user?.user_metadata?.display_name || '')
        setEmail(user?.email || '')
    }, [user])

    const isUsernameDisabled = isUsernameLoading || !username || username.length < 4 || username == user?.user_metadata?.display_name;
    const isEmailDisabled = isEmailLoading || !email || email.length < 4 || email == user?.email;

    const handleChangeUsername = async () => {
        setIsUsernameLoading(true);
        if (username === user?.user_metadata?.display_name) {
            setIsUsernameLoading(false);
            return;
        }
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
        setIsUsernameLoading(false);
    };

    const handleChangeEmail = async () => {
        setIsEmailLoading(true);
        if (email?.toLowerCase() === user?.email) {
            setIsEmailLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({
            email: email
        });

        if (error) {
            Alert.alert(t("common.error"), t("account.editAccount.errorMessage"));
        } else {
            Alert.alert(t("common.success"), t("account.editAccount.successMessage"));
        }
        setIsEmailLoading(false);
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
            <View style={[styles.form, type === 'danger' && { backgroundColor: 'rgba(255, 0, 0, 0.2)' }]}>
                {type == 'username' && (
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            onFocus={handleFocus}
                            maxLength={20}
                            placeholder={isUsernameLoading ? t('common.loading') : t('account.sections.username.placeholder')}
                            placeholderTextColor='grey'
                            editable={!isUsernameLoading}
                        />
                        <TouchableOpacity
                            style={[styles.saveButton, isUsernameDisabled && { backgroundColor: 'rgb(174, 174, 174)' }]}
                            onPress={handleChangeUsername}
                            disabled={isUsernameDisabled}
                        >
                            {isUsernameLoading ? <ActivityIndicator size={22} color="white" /> : <Entypo name="save" size={22} color="white" />}
                        </TouchableOpacity>
                    </View>
                )}
                {type == 'email' && (
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            onFocus={handleFocus}
                            maxLength={200}
                            placeholder={isEmailLoading ? t('common.loading') : t('account.sections.email.placeholder')}
                            placeholderTextColor='grey'
                            editable={!isEmailLoading}
                        />
                        <TouchableOpacity
                            style={[styles.saveButton, isEmailDisabled && { backgroundColor: 'rgb(174, 174, 174)' }]}
                            onPress={handleChangeEmail}
                            disabled={isEmailDisabled}
                        >
                            {isEmailLoading ? <ActivityIndicator size={22} color="white" /> :
                                <Entypo name="save" size={22} color="white" />
                            }
                        </TouchableOpacity>
                    </View>
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
    form: {
        padding: 12,
        gap: 10
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        fontSize: 16,

    },
    input: {
        flex: 1,
        padding: 5,
        paddingLeft: 10,
    },
    saveButton: {
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
        padding: 8,
        margin: 4,
    },
})