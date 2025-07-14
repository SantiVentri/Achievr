import { Colors } from "@/constants/palette";
import { supabase } from "@/utils/supabase";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function EditGoalHeader({ id, header_image }: { id: string; header_image: string; }) {
    const router = useRouter();
    const { t } = useTranslation();
    const [header, setHeader] = useState(header_image)
    const [isLoading, setIsLoading] = useState(false)

    const getHeader = async () => {
        const { data, error } = await supabase.from("goals").select('header_image').eq("id", id).single();
        if (error) {
            Alert.alert(t('common.error'), t('home.editGoal.getHeaderError')); // Checkear si esto existe
        }
        setHeader(data?.header_image)
    }

    useFocusEffect(useCallback(() => {
        setIsLoading(true)
        getHeader()
        setIsLoading(false)
    }, [header_image]))

    const handleChangeHeader = async () => {
        setIsLoading(true)
        router.push({
            pathname: "/headerModal",
            params: {
                id: id,
                header_image: header,
            }
        })
        setIsLoading(true)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleChangeHeader}>
            <View style={styles.imageWrapper}>
                {header ? (
                    <Image
                        source={{ uri: header }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={[styles.image, { backgroundColor: Colors.primary }]} />
                )}
            </View>
            <View style={styles.editIcon}>
                <Feather name="edit" size={20} color="white" />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderRadius: 10,
        borderColor: Colors.primary,
        width: 280,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 120,
    },
    imageWrapper: {
        position: "relative",
        height: 120,
        width: "100%",
    },
    editIcon: {
        position: "absolute",
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 100,
    },
});