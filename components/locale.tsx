import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const enFlag = require("../assets/icons/enFlag.png");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const esFlag = require("../assets/icons/esFlag.png");

export default function ChangeLocale({ locale, text, size }: { locale: string, text?: boolean, size: number }) {
    const { i18n, t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeLocale = (locale: string) => {
        setIsLoading(true);
        i18n.changeLanguage(locale);
        Alert.alert(t("account.locale.success"), t("account.locale.locale_changed_successfully"));
        setIsLoading(false);
    }
    return (
        <TouchableOpacity onPress={() => handleChangeLocale(locale)} style={styles.container} disabled={locale === i18n.language || isLoading}>
            <Image
                source={locale === "en" ? enFlag : esFlag}
                resizeMode="contain"
                style={[styles.flag, { width: size, height: size }]}
            />
            {text && <Text style={styles.text}>{locale.toUpperCase()}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    flag: {
        borderRadius: 100,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
})