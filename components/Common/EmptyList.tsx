import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function EmptyList(props: { image: string; title: string; description: string; }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <View style={styles.container}>
            {!imageLoaded && (
                <ActivityIndicator size="large" color="grey" />
            )}
            <Image
                source={{ uri: props.image }}
                width={150}
                height={150}
                onLoadEnd={() => setImageLoaded(true)}
            />
            {imageLoaded && (
                <View style={styles.text}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        gap: 15
    },
    text: {
        gap: 5,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    description: {
        textAlign: 'center'
    },
});