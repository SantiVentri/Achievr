import { Colors } from "@/constants/palette";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";

export default function Header({ title }: { title: string }) {
    const router = useRouter();
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialIcons name="menu" size={35} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
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