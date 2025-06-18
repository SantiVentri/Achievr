import Avatar from "@/components/Avatar";
import { Colors } from "@/constants/palette";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EditAccountScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Edit Account</Text>
            <View style={styles.form}>
                <Text style={styles.formSubtitle}>Your avatar</Text>
                <TouchableOpacity style={styles.editAvatar} onPress={() => router.push('/AvatarModal')}>
                    <Avatar size={120} />
                    <View style={styles.editAvatarButton}>
                        <MaterialIcons name="edit" size={24} color="white" />
                    </View>
                </TouchableOpacity>
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
    formTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    formSubtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    form: {
        alignItems: "flex-start",
        gap: 20,
    },
    editAvatar: {
        position: "relative",
        outlineWidth: 4,
        outlineColor: Colors.primary,
        outlineStyle: "solid",
        outlineOffset: -1,
        borderRadius: '100%',
        alignItems: "flex-start",
        gap: 10,
    },
    editAvatarButton: {
        position: "absolute",
        bottom: -5,
        right: -5,
        outlineWidth: 3,
        outlineColor: "white",
        outlineStyle: "solid",
        backgroundColor: Colors.primary,
        borderRadius: '100%',
        padding: 8,
    },
});