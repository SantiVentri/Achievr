import Header from "@/components/Header";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

export default function HomeLayout() {
    const router = useRouter();
    const { user, loading } = useUser();

    React.useEffect(() => {
        if (!loading && !user) {
            router.replace('/(auth)/signin');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary }}>
                <Image source={require("@/assets/images/splash-icon.png")} style={{ height: 120, width: 120 }} />
            </View>
        );
    }
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
            <Stack.Screen name="index" options={{ header: () => <Header title="Dreamr" /> }} />
            <Stack.Screen name="account" options={{ headerShown: false }} />
            <Stack.Screen name="createGoal" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="editAccount" options={{ headerShown: false }} />
            <Stack.Screen name="AvatarModal" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="(goals)/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="(subtasks)/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="(subtasks)/createSubtask" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
    )
}