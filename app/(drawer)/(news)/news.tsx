import { getNews } from "@/components/data";
import News from "@/components/News";
import { NewsType } from "@/enums/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function NewsListScreen() {
    const [news, setNews] = useState<NewsType[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const { i18n, t } = useTranslation();
    const locale = i18n.language;

    const fetchNews = useCallback(async () => {
        const data = await getNews(locale as string);
        setNews(data)
    }, [locale]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useFocusEffect(
        useCallback(() => {
            fetchNews();
        }, [fetchNews])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchNews();
        setRefreshing(false);
    }, [fetchNews]);

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.newsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <News {...item} />}
                ListEmptyComponent={() => <Text>{t("news.noNews")}</Text>}
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