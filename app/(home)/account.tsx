import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { useUser } from "@/context/UserContext";
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
    const { user } = useUser();
    const username = user?.user_metadata.display_name;
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Feather name="edit" size={24} color="black" />
            <View style={styles.accountHeader}>
                <Avatar size={120} />
                <View style={styles.accountInfo}>
                    <Text style={styles.title}>{username}</Text>
                    <Text style={styles.subtitle}>{user?.email}</Text>
                </View>
            </View>
            <SignOutButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 25,
        gap: 30,
    },
    accountHeader: {
        alignItems: "center",
        gap: 20,
    },
    accountInfo: {
        alignItems: "center",
        gap: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    subtitle: {
        fontSize: 16,
        color: "gray",
    },
})