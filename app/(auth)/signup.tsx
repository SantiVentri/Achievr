import AuthLocaleSelect from '@/components/AuthLocaleSelect';
import { Colors } from '@/constants/palette';
import { supabase } from '@/utils/supabase';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const disabled = !username || !email || !password;

    const handleSignIn = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: username,
                }
            }
        })
        if (error) {
            Alert.alert(t("common.error"), t("auth.signup.errorMessage"));
        } else {
            router.replace("/");
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <AuthLocaleSelect />
                <View style={styles.formHeader}>
                    <Image
                        source={require("@/assets/images/splash-icon.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>{t("auth.signup.title")}</Text>
                    <Text style={styles.description}>{t("auth.signup.description")}</Text>
                </View>
                <View style={styles.formBody}>
                    <View style={styles.formGroup}>
                        <Text style={styles.formGroupLabel}>{t("common.username")}:</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder={t("common.usernamePlaceholder")}
                            placeholderTextColor="gray"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formGroupLabel}>{t("common.email")}:</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder={t("common.emailPlaceholder")}
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formGroupLabel}>{t("common.password")}:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder={t("common.passwordPlaceholder")}
                                placeholderTextColor="gray"
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                                <Feather name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.button, { opacity: loading || disabled ? 0.5 : 1 }]} onPress={handleSignIn} disabled={loading || disabled}>
                        <Text style={styles.buttonText}>{loading ? t("common.loading") : t("auth.signup.signup")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.extraInfo}>
                <Text style={styles.extraInfoText}>{t("auth.signup.alreadyHaveAccount")}</Text>
                <TouchableOpacity onPress={() => router.replace("/signin")}>
                    <Text style={styles.extraInfoLink}>{t("auth.signup.signinLink")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 60,
    },
    form: {
        padding: 30,
        width: "100%",
        gap: 40,
    },
    formHeader: {
        alignItems: "center",
        gap: 10,
    },
    logo: {
        borderRadius: 20,
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "gray",
    },
    formBody: {
        gap: 10,
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
    inputContainer: {
        position: "relative",
    },
    passwordToggle: {
        position: "absolute",
        top: 8,
        right: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    extraInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    extraInfoText: {
        fontSize: 16,
        color: "gray",
    },
    extraInfoLink: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
})