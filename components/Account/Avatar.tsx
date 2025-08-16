import { useUser } from "@/context/UserContext";
import { Image, View } from "react-native";

export default function Avatar({ size }: { size: number }) {
    const { avatar } = useUser();

    return (
        <View style={{ backgroundColor: "white", borderRadius: 100 }}>
            <Image
                source={avatar ? { uri: avatar } : require('@/assets/images/icon.png')}
                style={{ height: size, width: size, borderRadius: 100 }}
            />
        </View>
    )
}