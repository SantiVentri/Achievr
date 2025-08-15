import BlockedFeatureModal from "@/components/Common/BlockedFeature";
import LocaleSelect from "@/components/Locale/LocaleSelect";
import { Colors } from "@/constants/palette";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ForgotPasswordScreen() {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <BlockedFeatureModal />
            <View style={styles.form}>
                <View style={{ alignItems: 'flex-end' }}>
                    <LocaleSelect />
                </View>
                <View style={styles.formHeader}>
                    <Image
                        source={require("@/assets/icons/splash-icon-light.png")}
                        style={styles.logo}
                    />
                    <View style={styles.titles}>
                        <Text style={styles.title}>{t("auth.forgot-password.title")}</Text>
                        <Text style={styles.description}>{t("auth.forgot-password.description")}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 60,
    },
    form: {
        padding: 30,
        width: "100%",
        gap: 40,
    },
    formHeader: {
        alignItems: "center",
        gap: 20,
    },
    logo: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        width: 80,
        height: 80,
    },
    titles: {
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        maxWidth: 260,
        textAlign: "center",
        color: "gray",
    },
    formBody: {
        gap: 10,
    },
    formGroup: {
        gap: 10,
    },
    formGroupLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        padding: 10,
    },
    inputContainer: {
        position: "relative",
    },
    passwordToggle: {
        position: "absolute",
        top: 8,
        right: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    formFooter: {
        paddingVertical: 6,
    },
    extraInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    extraInfoText: {
        fontSize: 16,
        color: "gray",
    },
    extraInfoLink: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
})