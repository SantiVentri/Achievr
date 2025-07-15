import EmptyList from "@/components/Common/EmptyList";
import News from "@/components/News/News";
import { NewsType } from "@/enums/types";
import { getNews } from "@/utils/data";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

export default function NewsListScreen() {
    const [news, setNews] = useState<NewsType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const { i18n, t } = useTranslation();
    const locale = i18n.language;

    const fetchNews = useCallback(async () => {
        const data = await getNews(locale as string);
        setNews(data)
    }, [locale]);

    useEffect(() => {
        setIsLoading(true);
        fetchNews();
        setIsLoading(false);
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
                    <RefreshControl tintColor="grey" refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.newsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <News {...item} />}
                ListEmptyComponent={
                    !isLoading && news?.length === 0 ?
                        <EmptyList
                            image="https://odpjykyuzmfjeauhkwhw.supabase.co/storage/v1/object/public/images/notFound.png"
                            title={t('news.noNewsTitle')}
                            description={t('news.noNewsDescription')}
                        />
                        : null
                }
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