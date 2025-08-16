import Avatar from "@/components/Account/Avatar";
import AvatarModal from "@/components/Account/AvatarModal";
import AccountSection from "@/components/Account/Section";
import FeedbackForm from "@/components/Drawer/Feedback";
import LocaleSelect from "@/components/Locale/LocaleSelect";
import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
    const { t } = useTranslation();
    const { user } = useUser();
    const username = user?.user_metadata.display_name;
    const scrollViewRef = useRef<ScrollView | null>(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert(t('common.error'), t('auth.signout.errorMessage'))
        }
    }

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
                <StatusBar style="dark" />
                <View style={styles.options}>
                    <TouchableOpacity onPress={handleSignOut}>
                        <MaterialIcons name="logout" size={30} color="red" />
                    </TouchableOpacity>
                    <LocaleSelect />
                </View>
                <View style={styles.accountHeader}>
                    <Pressable style={styles.avatarContainer} onPress={() => setShowAvatarModal(true)}>
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
                    <Pressable style={styles.feedbackSection} onPress={() => setShowFeedbackModal(true)}>
                        <FontAwesome6 name="book-bookmark" size={35} color="white" />
                        <View style={styles.content}>
                            <Text style={styles.feedbackTitle} >{t('feedback.title')}</Text>
                            <Text style={styles.feedbackDescription} >{t('feedback.description')}</Text>
                        </View>
                    </Pressable>
                    <AccountSection type="username" onInputFocus={scrollToInput} />
                    <AccountSection type="email" onInputFocus={scrollToInput} />
                    <AccountSection type="password" onInputFocus={scrollToInput} />
                    <AccountSection type="danger" />
                </View>
            </ScrollView>
            <FeedbackForm
                visible={showFeedbackModal}
                onClose={() => setShowFeedbackModal(false)}
            />
            <Modal
                visible={showAvatarModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowAvatarModal(false)}
            >
                <Pressable onPress={() => setShowAvatarModal(false)} style={styles.overlay}>
                    <Pressable onPress={() => { }} style={styles.modalContainer}>
                        <AvatarModal />
                    </Pressable>
                </Pressable>
            </Modal>
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
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    feedbackSection: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 15,
        padding: 20,
        gap: 20
    },
    content: {
        flex: 1,
        paddingBottom: 20,
        gap: 5
    },
    feedbackTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    feedbackDescription: {
        fontSize: 15,
        color: 'white',
        opacity: 0.8
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        maxWidth: 400,
        padding: 20,
    }
})