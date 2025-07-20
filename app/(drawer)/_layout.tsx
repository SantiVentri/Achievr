import DrawerContent from "@/components/Drawer/DrawerContent";
import FeedbackForm from "@/components/Drawer/Feedback";
import ReportForm from "@/components/Drawer/Report";
import OnboardingRedirect from "@/components/onboarding/OnboardingRedirect";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
    const [showFeedback, setShowFeedback] = useState(false);
    const [showReport, setShowReport] = useState(false);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <OnboardingRedirect />
            <FeedbackForm visible={showFeedback} onClose={() => setShowFeedback(false)} />
            <ReportForm visible={showReport} onClose={() => setShowReport(false)} />
            <Drawer
                screenOptions={{
                    headerShown: false,
                    swipeEnabled: false
                }}
                drawerContent={(props) => (
                    <DrawerContent
                        {...props}
                        onFeedbackPress={() => setShowFeedback(true)}
                        onReportPress={() => setShowReport(true)}
                    />
                )}
            >
                <Drawer.Screen name="(home)" options={{ title: "Home" }} />
                <Drawer.Screen name="(news)" options={{ title: "News" }} />
                <Drawer.Screen name="(onboarding)" />
            </Drawer>
        </GestureHandlerRootView>
    )
}