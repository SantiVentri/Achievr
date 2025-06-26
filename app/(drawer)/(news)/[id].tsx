import { getNews, getSection } from "@/components/data";
import { Colors } from "@/constants/palette";
import { NewsType, SectionType } from "@/enums/types";
import { getLocales } from "expo-localization";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function NewsScreen() {
    const { id } = useLocalSearchParams();
    const [news, setNews] = useState<NewsType | null>(null)
    const [sections, setSections] = useState<SectionType[]>([])
    const locale = getLocales()[0].languageTag;

    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await getNews(id as string);
            const sectionData = await getSection(id as string);
            setNews(newsData)
            setSections(sectionData)
        }
        fetchNews();
    }, []);

    const formattedDate = news?.created_at ? new Date(news.created_at).toLocaleDateString(locale, { day: "numeric", month: "numeric", year: "2-digit" }) : "";

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: news?.header_image }}
                    style={styles.image}
                />
            </View>
            <View style={styles.info}>
                <View>
                    <Text style={styles.creation}>{news?.author} - {formattedDate}</Text>
                    <Text style={styles.title}>{news?.title}</Text>
                </View>
                <FlatList
                    data={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{item.title}</Text>
                            <Text style={styles.sectionContent}>{item.content}</Text>
                        </View>
                    )}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 280,
        width: '100%',
        backgroundColor: Colors.primary
    },
    image: {
        height: '100%',
        width: '100%',
    },
    info: {
        padding: 15,
        gap: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24
    },
    creation: {
        fontWeight: 'bold',
        fontSize: 16
    },
    section: {
        gap: 10
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    sectionContent: {
        fontSize: 18
    }
});