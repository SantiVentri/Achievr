import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function OnboardingRedirect() {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();
    const { user } = useUser();

    useEffect(() => {
        if (pathname.startsWith("/welcome") || pathname.startsWith("/onboarding")) return;

        const getOnboardingState = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from("users")
                .select("onboarding_done")
                .eq("user_id", user.id)
                .single();

            if (error) {
                Alert.alert(t("common.error"), t("onboarding.getOnboardingStateError"));
                return;
            }

            if (!data.onboarding_done) {
                router.replace("/welcome");
            }
        };

        getOnboardingState();
    }, [user, pathname]);

    return null;
}
