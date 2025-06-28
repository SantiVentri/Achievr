import { NewsType } from "@/enums/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function News({ id, header_image, title, description, author, created_at }: NewsType) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { i18n } = useTranslation();
    const dateLocale = i18n.language === 'en' ? 'en-US' : 'es-ES';

    const handleRouter = () => {
        setIsLoading(true)
        router.push({
            pathname: "/(drawer)/(news)/[id]",
            params: { id }
        })
        setIsLoading(false)
    }

    const formattedDate = new Date(created_at).toLocaleDateString(dateLocale, {
        day: "numeric",
        month: "numeric",
        year: "2-digit"
    });

    return (
        <Pressable style={styles.container} onPress={handleRouter} disabled={isLoading}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: header_image }}
                    style={styles.image}
                />
            </View>
            <View style={styles.info}>
                <View style={styles.header}>
                    <Text style={styles.creation}>{author} - {formattedDate}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text>{description}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        height: 200,
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    info: {
        padding: 15,
        gap: 10
    },
    header: {
        gap: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    creation: {
        fontWeight: 'bold'
    }
})