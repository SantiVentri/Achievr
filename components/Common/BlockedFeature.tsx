import { Colors } from "@/constants/palette";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BlockedFeatureModal() {
    const { t } = useTranslation();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoBack = () => {
        setIsLoading(true);
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/")
        }
        setIsLoading(false);
    }

    return (
        <BlurView intensity={80} tint="light" style={styles.blurView}>
            <View style={styles.blurContainer}>
                <View style={styles.titles}>
                    <Text style={styles.blurTitle} >{t("common.blockedModal.title")}</Text>
                    <Text style={styles.blurDescription} >{t("common.blockedModal.description")}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, isLoading && { backgroundColor: 'gray' }]}
                    onPress={handleGoBack}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {!isLoading ? t("common.blockedModal.button") : t("common.loading")}
                    </Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    // Blocked modal
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        zIndex: 1
    },
    blurContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        gap: 15,

        // Shadow para iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow para Android
        elevation: 5,
    },
    titles: {
        gap: 5,
    },
    blurTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    blurDescription: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray'
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        width: '100%'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})