import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
                <StatusBar style="light" />
                <Image source={require("@/assets/images/splash-icon.png")} style={{ height: 120, width: 120 }} />
            </View>
        );
    }
    return (
        <Stack>
            <Stack.Screen name="index" />
        </Stack>
    )
}