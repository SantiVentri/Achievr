import Header from "@/components/Header";
import { Stack } from "expo-router";

export default function NewsLayout() {
    return (
        <Stack>
            <Stack.Screen name="news" options={{ header: () => <Header /> }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    )
}