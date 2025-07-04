import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function OnboardingRedirect() {
    const router = useRouter();
    const { t } = useTranslation();
    const { user } = useUser();

    useEffect(() => {
        const getOnboardingState = async () => {
            const { data, error } = await supabase.from('users').select('onboarding_done').eq('user_id', user?.id).single();

            if (error) {
                Alert.alert(t('common.error'), t('onboarding.getOnboardingStateError'));
                return;
            }

            if (!data.onboarding_done) {
                router.replace('/welcome')
            }
        }
        getOnboardingState();
    }, []);
    return null;
}