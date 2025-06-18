import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from "react";
import { Image, View } from "react-native";

export default function Avatar({ size }: { size: number }) {
    const { user } = useUser();
    const [avatar, setAvatar] = useState<string | null>(null);

    const getAvatar = async () => {
        if (!user) return;
        const { data, error } = await supabase.from('avatars').select('avatar').eq('user_id', user?.id).single();
        if (error) {
            console.error(error);
        }
        setAvatar(data?.avatar);
    }

    useFocusEffect(
        useCallback(() => {
            getAvatar();
        }, [user])
    );

    return (
        <View style={{ backgroundColor: "white", borderRadius: '100%' }}>
            <Image
                source={avatar ? { uri: avatar } : require('@/assets/images/icon.png')}
                style={{ height: size, width: size, borderRadius: '100%' }}
            />
        </View>
    )
}