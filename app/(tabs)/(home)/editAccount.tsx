import Avatar from "@/components/Avatar";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditAccountScreen() {
    const router = useRouter();
    const { user } = useUser();
    const [username, setUsername] = useState(user?.user_metadata?.display_name || '');
    const [isLoading, setLoading] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);

    useEffect(() => {
        setIsUsernameValid(username.length > 4 && username !== user?.user_metadata?.display_name);
    }, [username]);

    const handleSave = async () => {
        setLoading(true);
        const { error } = await supabase.auth.updateUser({
            data: {
                display_name: username,
            }
        })
        if (error) {
            Alert.alert("Error", "Failed to update username");
        } else {
            Alert.alert("Success", "Username updated successfully");
            router.back();
        }
        setLoading(false);
    }

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
                <View style={styles.formGroup}>
                    <Text style={styles.formGroupLabel}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="e.g: John Doe"
                        placeholderTextColor="gray"
                    />
                </View>
                <TouchableOpacity style={[styles.saveButton, { backgroundColor: isLoading || !isUsernameValid ? "gray" : Colors.primary }]} onPress={handleSave} disabled={isLoading || !isUsernameValid}>
                    <Text style={styles.saveButtonText}>{isLoading ? "Saving..." : "Save"}</Text>
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
        borderRadius: 100,
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
        borderRadius: 100,
        padding: 8,
    },
    formGroup: {
        width: "100%",
        gap: 5,
    },
    formGroupLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        padding: 10,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        width: "100%",
    },
    saveButtonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
});