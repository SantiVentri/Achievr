import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";

export default function Avatar() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);

    const getAvatar = async () => {
        setLoading(true);
        if (!user) return;
        const { data, error } = await supabase.from('avatars').select('avatar').eq('user_id', user?.id).single();
        if (error) {
            console.error(error);
        }
        setAvatar(data?.avatar);
        setLoading(false);
    }

    useEffect(() => {
        getAvatar();
    }, [user]);

    return (
        <TouchableOpacity onPress={() => router.push("/account")} style={{ backgroundColor: "white", borderRadius: 100 }}>
            <Image
                source={avatar ? { uri: avatar } : require('@/assets/images/icon.png')}
                style={{ height: 35, width: 35, borderRadius: 100 }}
            />
        </TouchableOpacity>
    )
}