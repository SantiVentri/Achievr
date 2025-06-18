import { supabase } from "@/utils/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GoalScreen() {
    const { id } = useLocalSearchParams();
    const [goal, setGoal] = useState<any | null>(null);

    const getGoal = async () => {
        const { data, error } = await supabase.from("goals").select("*").eq("id", id).single();
        if (error) {
            console.error(error);
        } else {
            setGoal(data);
        }
    }

    useEffect(() => {
        getGoal();
    }, []);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: goal?.header_image }}
                    style={styles.image}
                />
                <View style={styles.headerTitles}>
                    <Text style={styles.title}>{goal?.title}</Text>
                    <Text style={styles.subtitle}>{goal?.short_description}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                    <FontAwesome name="trash" size={30} color="red" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 25,
    },
    header: {
        position: "relative",
    },
    deleteButton: {
        position: "absolute",
        top: 55,
        right: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FBD6D3",
        borderWidth: 3,
        borderColor: "red",
        borderRadius: 8,
        height: 42,
        width: 42,
    },
    image: {
        height: 250,
        width: "100%",
        filter: "brightness(0.7)",
    },
    headerTitles: {
        padding: 15,
        gap: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
    },
})