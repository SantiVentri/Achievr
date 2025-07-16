import Avatar from "@/components/Account/Avatar";
import AccountSection from "@/components/Account/Section";
import LocaleSelect from "@/components/Locale/LocaleSelect";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { useRef } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
    const { user } = useUser();
    const username = user?.user_metadata.display_name;
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView | null>(null);

    const scrollToInput = (inputY: number) => {
        scrollViewRef.current?.scrollTo({ y: inputY - 30, animated: true });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
        >
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={styles.locales}>
                    <LocaleSelect />
                </View>
                <View style={styles.accountHeader}>
                    <Pressable style={styles.avatarContainer} onPress={() => router.push("/AvatarModal")}>
                        <Avatar size={120} />
                        <View style={styles.editAvatar}>
                            <Feather name="edit" size={22} color="white" />
                        </View>
                    </Pressable>
                    <View style={styles.accountInfo}>
                        <Text style={styles.title}>{username}</Text>
                        <Text style={styles.subtitle}>{user?.email}</Text>
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <AccountSection type="username" onInputFocus={scrollToInput} />
                    <AccountSection type="email" onInputFocus={scrollToInput} />
                    <AccountSection type="danger" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 70,
        paddingHorizontal: 25,
        paddingBottom: 30,
        gap: 30,
    },
    locales: {
        alignItems: 'flex-end'
    },
    accountHeader: {
        alignItems: "center",
        marginTop: 20,
        gap: 20,
    },
    avatarContainer: {
        position: 'relative',
        borderWidth: 3,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        borderRadius: 100,
        padding: 3,
    },
    editAvatar: {
        position: 'absolute',
        right: -2,
        bottom: -2,
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 100
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
    sectionContainer: {
        gap: 15
    },
})