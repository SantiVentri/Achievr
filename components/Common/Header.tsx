import { Colors } from "@/constants/palette";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../Account/Avatar";

export default function Header() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const pathname = usePathname();

    const handleOpenDrawer = () => {
        setIsLoading(true);
        navigation.openDrawer();
        setIsLoading(false);
    }

    const handleGoHome = () => {
        if (pathname == '/') return null;
        router.replace('/')
    }

    return (
        <View style={[styles.container, Platform.OS == 'android' && { paddingTop: 50 }]}>
            <TouchableOpacity onPress={handleOpenDrawer} disabled={isLoading}>
                <MaterialIcons name="menu" size={35} color="white" />
            </TouchableOpacity>
            <Pressable onPress={handleGoHome}>
                <Text style={styles.title}>Achievr</Text>
            </Pressable>
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