import { Colors } from "@/constants/palette";
import { supabase } from "@/utils/supabase";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EditGoalIcon({ id, icon_name }: { id: string; icon_name: string; }) {
    const router = useRouter();
    const { t } = useTranslation();
    const [icon, setIcon] = useState(icon_name)
    const [isLoading, setIsLoading] = useState(false)

    const getIcon = async () => {
        const { data, error } = await supabase.from("goals").select('icon').eq("id", id).single();
        if (error) {
            Alert.alert(t('common.error'), t('home.editGoal.iconError')); // Checkear si esto existe
        }
        setIcon(data?.icon)
    }

    useFocusEffect(useCallback(() => {
        setIsLoading(true)
        getIcon()
        setIsLoading(false)
    }, [icon_name]))

    const handleChangeIcon = async () => {
        setIsLoading(true)
        router.push({
            pathname: "/iconsModal",
            params: {
                id: id,
                icon_name: icon_name,
            }
        })
        setIsLoading(true)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleChangeIcon} disabled={isLoading}>
            <View style={styles.iconWrapper}>
                <Text style={styles.icon}>{icon}</Text>
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
        width: 100,
        height: 100,
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 75
    },
    editIcon: {
        position: "absolute",
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 100,
    },
});