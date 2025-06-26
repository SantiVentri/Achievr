import { Colors } from "@/constants/palette";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";

export default function Header() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    const handleOpenDrawer = () => {
        setIsLoading(true);
        navigation.openDrawer();
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOpenDrawer} disabled={isLoading}>
                <MaterialIcons name="menu" size={35} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Dreamr</Text>
            <TouchableOpacity onPress={() => router.push("/account")}>
                <Avatar size={35} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.primary,
        paddingTop: 60,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
    },
})