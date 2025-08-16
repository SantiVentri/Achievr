import { headers } from "@/constants/defaultHeaders";
import { supabase } from "@/utils/supabase";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderModal() {
    const { t } = useTranslation();
    const { id, header } = useLocalSearchParams();
    const [currentHeader, setCurrentHeader] = useState(header);
    const [isLoading, setIsLoading] = useState(false);

    const getHeader = async () => {
        const { data, error } = await supabase.from("goals").select('header_image').eq("id", id).single();
        if (error) {
            Alert.alert(t('common.error'), t('home.editGoal.getHeaderError'));
        }
        setCurrentHeader(data?.header_image)
    }

    const handleChangeHeader = async (header: string) => {
        setIsLoading(true);
        const { error } = await supabase.from("goals").update({ header_image: header, updated_at: new Date().toISOString() }).eq("id", id);
        if (error) {
            Alert.alert(t("common.error"), t("home.editGoal.errorMessage"));
            return;
        } else {
            Alert.alert(t("common.success"), t("home.editGoal.successMessage"));
        }
        setCurrentHeader(header);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        getHeader();
    }, [id]));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("home.editGoal.headerImage")}</Text>
            <FlatList
                data={headers}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.headerContainer}
                        onPress={() => handleChangeHeader(item.image)}
                        disabled={isLoading}
                    >
                        <Image
                            style={styles.header}
                            source={{ uri: item.image }}
                            height={60}
                            width={100}
                        />
                        {currentHeader === item.image && (
                            <View style={styles.check}>
                                <Feather name="check" size={14} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.headerList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 25,
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    headerList: {
        padding: 10,
        paddingBottom: 50,
    },
    headerContainer: {
        position: "relative",
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        height: 60,
        width: 100,
        borderRadius: 80,
    },
    header: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
    },
    check: {
        position: "absolute",
        bottom: -6,
        right: -6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 100,
        height: 24,
        width: 24,
    },
})