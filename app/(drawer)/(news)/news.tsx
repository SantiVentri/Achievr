import { getNewsList } from "@/components/data";
import News from "@/components/News";
import { NewsType } from "@/enums/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function NewsListScreen() {
    const [news, setNews] = useState<NewsType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getNewsList();
            setNews(data)
        }
        fetchNews();
    })

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                contentContainerStyle={styles.newsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <News {...item} />}
                ListEmptyComponent={() => <Text>No news yet</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    newsList: {
        paddingTop: 20,
    }
});