import Avatar from "@/components/Avatar";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import LocaleSelect from "@/components/LocaleSelect";
import SignOutButton from "@/components/SignOutButton";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
    const { user } = useUser();
    const username = user?.user_metadata.display_name;
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <LocaleSelect />
                <TouchableOpacity onPress={() => router.push("/editAccount")}>
                    <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.accountHeader}>
                <View style={styles.avatarContainer}>
                    <Avatar size={120} />
                </View>
                <View style={styles.accountInfo}>
                    <Text style={styles.title}>{username}</Text>
                    <Text style={styles.subtitle}>{user?.email}</Text>
                </View>
            </View>
            <View style={styles.redButtons}>
                <SignOutButton />
                <DeleteAccountButton />
            </View>
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
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    accountHeader: {
        alignItems: "center",
        marginTop: 20,
        gap: 20,
    },
    avatarContainer: {
        borderWidth: 3,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        borderRadius: 100,
        padding: 3,
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
    redButtons: {
        gap: 15
    }
})