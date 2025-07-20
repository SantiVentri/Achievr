import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ReportForm({ visible, onClose }: { visible: boolean, onClose: () => void }) {
    const { t } = useTranslation();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [subject, setSubject] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [type, setType] = useState<string>('Bug');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(!isLoading && !!subject && subject.length > 6 && !!message && message?.length > 6);
    }, [subject, message, isLoading]);

    if (!visible) return null;

    const handleSend = async () => {
        setIsLoading(true);
        const { error } = await supabase.from('feedback').insert([{
            user_id: user?.id,
            subject: subject,
            message: message,
            type: type
        }]);
        if (error) {
            Alert.alert(t('common.error'), t('report.errorMessage'));
            onClose();
            return;
        };
        handleReset();
        Alert.alert(t('common.success'), t('report.successMessage'));
        onClose();
        setIsLoading(false);
    };

    const handleReset = () => {
        setIsLoading(true);
        setSubject("");
        setMessage("");
        setIsLoading(false);
    };

    const types = ["Bug", "UX/UI", t('report.other')]

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Pressable
                        style={styles.form}
                        onPress={() => Keyboard.dismiss()}
                    >
                        <View style={styles.header}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: 'https://odpjykyuzmfjeauhkwhw.supabase.co/storage/v1/object/public/images//report.png' }}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.headerTitles}>
                                <Text style={styles.title}>{t('report.title')}</Text>
                                <Text>{t('report.description')}</Text>
                            </View>
                        </View>
                        <View style={styles.types}>
                            {types.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.type, item === type && { backgroundColor: Colors.primary }]}
                                    onPress={() => setType(item)}
                                >
                                    <Text style={[styles.typeText, item === type && { color: 'white' }]}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={t('report.subjectPlaceholder')}
                            placeholderTextColor="grey"
                            value={subject}
                            onChangeText={setSubject}
                            numberOfLines={1}
                            maxLength={40}
                        />
                        <TextInput
                            style={[styles.input, { minHeight: 100 }]}
                            placeholder={t('report.messagePlaceholder')}
                            placeholderTextColor="grey"
                            value={message}
                            onChangeText={setMessage}
                            numberOfLines={4}
                            maxLength={240}
                            multiline
                        />
                        <TouchableOpacity style={[styles.button, { backgroundColor: !isValid || isLoading ? 'grey' : Colors.primary }]} onPress={handleSend} disabled={!isValid || isLoading}>
                            <Text style={styles.buttonText}>{isLoading ? t('common.loading') : t('report.send')}</Text>
                        </TouchableOpacity>
                    </Pressable>
                </KeyboardAvoidingView>
            </Pressable>
        </Modal >
    )
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    form: {
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 15,
        width: '85%',
        gap: 15,
    },
    header: {
        gap: 15
    },
    imageContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        height: 180,
        width: '100%',
        overflow: 'hidden'
    },
    image: {
        height: 180,
        objectFit: 'cover',
    },
    headerTitles: {
        gap: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    types: {
        flexDirection: 'row',
        gap: 10
    },
    type: {
        borderWidth: 3,
        borderColor: Colors.primary,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    typeText: {
        color: Colors.primary,
        fontWeight: 'bold'
    },
    input: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        fontSize: 15
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
})