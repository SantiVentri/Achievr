import { avatars } from "@/constants/defaultAvatars";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AvatarModal() {
    const { user, updateAvatar } = useUser();
    const { t } = useTranslation();
    const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAvatar = async () => {
        const { data, error } = await supabase.from("users").select('avatar').eq("user_id", user?.id).single();
        if (error) {
            Alert.alert("Error", error.message);
        }
        setCurrentAvatar(data?.avatar)
    }

    const handleChangeAvatar = async (avatar: string) => {
        setIsLoading(true);

        const { error } = await supabase.from("users").update({ avatar: avatar, updated_at: new Date().toISOString() }).eq("user_id", user?.id);
        if (error) {
            Alert.alert(t("common.error"), t("account.avatar.changeAvatarError"));
            return;
        } else {
            Alert.alert(t("common.success"), t("account.avatar.changeAvatarSuccess"));
            updateAvatar();
        }
        setCurrentAvatar(avatar);
        setIsLoading(false);
    }

    useEffect(() => {
        getAvatar();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("account.avatar.select")}:</Text>
            <View style={styles.avatarContainer}>
                {avatars.map((avatar) => (
                    <TouchableOpacity key={avatar.id} style={styles.avatar} onPress={() => handleChangeAvatar(avatar.image)} disabled={isLoading}>
                        <View>
                            <Image source={{ uri: avatar.image }} style={{ width: 80, height: 80, borderRadius: 80 }} />
                        </View>
                        {currentAvatar === avatar.image && (
                            <View style={styles.check}>
                                <Feather name="check" size={16} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    avatar: {
        position: "relative",
        outlineWidth: 2,
        outlineColor: Colors.primary,
        outlineStyle: "solid",
        backgroundColor: Colors.primary,
        borderRadius: 100,
    },
    avatarContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    check: {
        position: "absolute",
        bottom: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        outlineWidth: 2,
        outlineColor: "white",
        outlineStyle: "solid",
        borderRadius: 100,
        height: 25,
        width: 25,
    },
}) 