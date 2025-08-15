import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
    return (
        <>
            <StatusBar style='dark' />
            <Stack screenOptions={{ headerShown: false, animation: "none" }}>
                <Stack.Screen name='signin' />
                <Stack.Screen name='signup' />
                <Stack.Screen name='forgot-password' />
            </Stack>
        </>
    )
}