import AvatarModal from "@/components/AvatarModal";
import ContinueButton from "@/components/onboarding/continueButton";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

export default function Onboarding() {
    const { user } = useUser();
    const [step, setStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const handlePress = () => {
        setIsLoading(true);
        setStep(step + 1);
        setIsLoading(false);
    }

    const handleFinish = async () => {
        const { error } = await supabase.from('users').update({ 'onboarding_done': true }).eq('user_id', user?.id)

        if (error) {
            Alert.alert(t('common.error'), t('onboarding.updateOnboardingStateError'))
            return;
        }
        router.replace('/')
    }

    return (
        <View style={styles.container}>
            {step == 1 && <AvatarModal />}
            <ContinueButton text={step == 1 ? "onboarding.button.finishSetup" : "onboarding.button.continue"} onPress={step == 1 ? handleFinish : handlePress} disabled={isLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 80,
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});