import AvatarModal from "@/components/Account/AvatarModal";
import ContinueButton from "@/components/onboarding/ContinueButton";
import SetUsernameModal from "@/components/onboarding/SetUsername";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
    const { user, avatar } = useUser();
    const { t } = useTranslation();
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [username, setUsername] = useState<string>(user?.user_metadata?.display_name || "");

    const handlePress = async () => {
        setIsLoading(true);
        if (step == 1) {
            if (username != user?.user_metadata?.display_name) {
                const { error } = await supabase.auth.updateUser({
                    data: {
                        display_name: username,
                    },
                })
                if (error) {
                    Alert.alert(t("common.error"), t("account.editAccount.errorMessage"));
                } else {
                    Alert.alert(t("common.success"), t("account.editAccount.successMessage"));
                }
            }
            setStep(step + 1);
        }
        else if (step == 2) {
            const { error } = await supabase.from('users').update({ 'onboarding_done': true }).eq('user_id', user?.id)

            if (error) {
                Alert.alert(t('common.error'), t('onboarding.updateOnboardingStateError'))
                return;
            }
            router.replace('/')
        }

        setIsLoading(false);
    }

    const handleGoBack = () => {
        setIsLoading(true);
        if (step == 1) {
            router.back();
        } else {
            setStep(step - 1);
        }
        setIsLoading(false);
    }

    const handleUsernameChange = (newUsername: string) => {
        setUsername(newUsername);
    };

    useEffect(() => {
        setProgress((step / 2) * 100)
    }, [step])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={handleGoBack} disabled={isLoading}>
                    <Feather name="arrow-left" size={30} color="black" />
                </Pressable>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress, { width: `${progress}%` }]} />
                    </View>
                </View>
                <Text style={styles.headerTitle}>{step}/2</Text>
            </View>

            {step == 1 && <SetUsernameModal onUsernameChange={handleUsernameChange} initialUsername={username} />}
            {step == 2 && <AvatarModal />}
            <ContinueButton
                text={step == 2 ? "onboarding.button.finishSetup" : "onboarding.button.continue"}
                onPress={handlePress}
                disabled={isLoading || (step == 1 && !username) || (step == 2 && !avatar)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginVertical: 20,
        width: '100%',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    progressContainer: {
        flex: 1,
    },
    progressBar: {
        width: '100%',
        height: 12,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
});