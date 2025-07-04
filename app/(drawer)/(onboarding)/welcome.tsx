import ContinueButton from "@/components/onboarding/continueButton";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Welcome() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <ContinueButton text="onboarding.button.continue" onPress={() => router.push("/onboarding")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25
    },
});