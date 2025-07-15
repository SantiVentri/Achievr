import DrawerContent from "@/components/Drawer/DrawerContent";
import OnboardingRedirect from "@/components/onboarding/OnboardingRedirect";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <OnboardingRedirect />
            <Drawer
                screenOptions={{
                    headerShown: false,
                    swipeEnabled: false
                }}
                drawerContent={(props) => <DrawerContent {...props} />}
            >
                <Drawer.Screen name="(home)" options={{ title: "Home" }} />
                <Drawer.Screen name="(news)" options={{ title: "News" }} />
                <Drawer.Screen name="(onboarding)" />
            </Drawer>
        </GestureHandlerRootView>
    )
}