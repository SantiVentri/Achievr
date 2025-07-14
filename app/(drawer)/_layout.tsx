import DrawerContent from "@/components/Drawer/DrawerContent";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: false,
                    swipeEnabled: false
                }}
                drawerContent={(props) => <DrawerContent {...props} />}
            >
                <Drawer.Screen name="(home)" options={{ title: "Home" }} />
                <Drawer.Screen name="(news)" options={{ title: "News" }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}