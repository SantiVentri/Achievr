import FeedbackForm from "@/components/Account/Feedback";
import DrawerContent from "@/components/Drawer/DrawerContent";
import OnboardingRedirect from "@/components/onboarding/OnboardingRedirect";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
    const [showFeedback, setShowFeedback] = useState(false);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <OnboardingRedirect />
            <FeedbackForm visible={showFeedback} onClose={() => setShowFeedback(false)} />
            <Drawer
                screenOptions={{
                    headerShown: false,
                    swipeEnabled: false
                }}
                drawerContent={(props) => <DrawerContent {...props} onFeedbackPress={() => setShowFeedback(true)} />}
            >
                <Drawer.Screen name="(home)" options={{ title: "Home" }} />
                <Drawer.Screen name="(news)" options={{ title: "News" }} />
                <Drawer.Screen name="(onboarding)" />
            </Drawer>
        </GestureHandlerRootView>
    )
}