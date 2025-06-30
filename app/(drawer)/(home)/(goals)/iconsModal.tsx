import { icons } from "@/constants/iconsList";
import { supabase } from "@/utils/supabase";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function IconsModal() {
    const { t } = useTranslation();
    const { id, icon } = useLocalSearchParams();
    const [currentIcon, setCurrentIcon] = useState(icon);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getIcon = async () => {
        const { data, error } = await supabase.from("goals").select('icon').eq("id", id).single();
        if (error) {
            Alert.alert(t('common.error'), t('home.editGoal.getIconError'));
        }
        setCurrentIcon(data?.icon)
    }

    const handleChangeIcon = async (icon: string) => {
        setIsLoading(true);

        const { data: currentData, error: fetchError } = await supabase
            .from("goals")
            .select("updated_at")
            .eq("id", id)
            .single();

        if (fetchError) {
            Alert.alert(t("goals.icon.error"), fetchError?.message);
            setIsLoading(false);
            return;
        }

        if (currentData?.updated_at) {
            const lastUpdate = new Date(currentData.updated_at);
            const now = new Date();
            const timeDiff = now.getTime() - lastUpdate.getTime();
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));

            if (minutesDiff < 3) {
                const remainingMinutes = 3 - minutesDiff;
                Alert.alert(
                    t("home.editGoal.timeRestriction"),
                    t("home.editGoal.timeRestrictionMessage", { remainingMinutes })
                );
                setIsLoading(false);
                return;
            }
        }

        const { error } = await supabase.from("goals").update({ icon: icon, updated_at: new Date().toISOString() }).eq("id", id);
        if (error) {
            Alert.alert(t("common.error"), t("home.editGoal.changeIconError"));
            return;
        } else {
            Alert.alert(t("common.success"), t("home.editGoal.changeIconSuccess"));
        }
        setCurrentIcon(icon);
        setIsLoading(false);
    }

    useEffect(() => {
        getIcon();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("home.editGoal.iconImage")}</Text>
            <ScrollView contentContainerStyle={styles.iconContainer}>
                {icons.map((icon) => (
                    <TouchableOpacity key={icon.id} style={styles.icon} onPress={() => handleChangeIcon(icon.emoji)} disabled={isLoading}>
                        <Text style={styles.emoji}>{icon.emoji}</Text>
                        {currentIcon === icon.emoji && (
                            <View style={styles.check}>
                                <Feather name="check" size={10} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 25,
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    iconContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: 50,
        gap: 10,
    },
    icon: {
        position: "relative",
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
        borderRadius: 100,
    },
    emoji: {
        fontSize: 25
    },
    check: {
        position: "absolute",
        bottom: -4,
        right: -4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        outlineWidth: 2,
        outlineColor: "white",
        outlineStyle: "solid",
        borderRadius: 100,
        height: 18,
        width: 18,
    },
})