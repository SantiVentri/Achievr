import { Colors } from "@/constants/palette";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function EditGoalHeader({ link }: { link: string }) {
    const handleChangeImage = async () => { }
    const [image, setImage] = useState(link)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setImage(link)
        setIsLoading(false)
    }, [link])

    return (
        <TouchableOpacity style={styles.container} onPress={handleChangeImage}>
            <View style={styles.imageWrapper}>
                {isLoading ? (
                    <View style={styles.image}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                ) : (
                    <Image
                        source={{ uri: image || 'https://placehold.co/600x400' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
            </View>
            <View style={styles.editIcon}>
                <Feather name="edit" size={20} color="white" />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderRadius: 10,
        borderColor: Colors.primary,
        width: 280,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 120,
        backgroundColor: Colors.primary,
    },
    imageWrapper: {
        width: "100%",
        height: 120,
        position: "relative",
    },
    editIcon: {
        position: "absolute",
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 100,
    },
});