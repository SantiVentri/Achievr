import ContinueButton from "@/components/onboarding/ContinueButton";
import { Colors } from "@/constants/palette";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Welcome() {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#3454d1', 'rgba(255, 255, 255, 1)']}
                start={{ x: -0.1, y: 0.1 }}
                end={{ x: 0.5, y: 0.5 }}
                style={styles.gradient}
            />
            <View style={styles.imageContainer}>
                <Image
                    source={require('@/assets/images/onboarding/play_guitar_noBG.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.title}>{t('onboarding.welcome.title')}, {"\n"} <Text style={styles.titleColored}>{t('onboarding.welcome.coloredTitle')}.</Text></Text>
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
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    titleColored: {
        color: Colors.primary
    }
});