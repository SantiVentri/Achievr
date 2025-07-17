import EmptyList from '@/components/Common/EmptyList';
import CreateGoalButton from '@/components/Goal/createGoalButton';
import Goal from '@/components/Goal/Goal';
import { useUser } from '@/context/UserContext';
import { GoalType } from '@/enums/types';
import { getGoals } from '@/utils/data';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

const getGreeting = () => {
  const { t } = useTranslation();
  const hour = new Date().getHours();
  if (hour > 5 && hour <= 12) return t("home.greeting.morning")
  if (hour >= 13 && hour <= 19) return t("home.greeting.afternoon")
  return t("home.greeting.evening")
};

export default function Page() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    const goals = await getGoals(user)
    setGoals(goals);
    setIsLoading(false);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchGoals();
    }, [fetchGoals])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchGoals();
    setRefreshing(false);
  }, [fetchGoals]);

  return (
    <View style={styles.container}>
      <FlatList
        data={goals}
        keyExtractor={(goal) => goal.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Goal {...item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.subtitle}>{t("home.subtitle", { name: user?.user_metadata?.display_name })}</Text>
              <Text style={styles.title}>{getGreeting()}</Text>
            </View>
            <Text style={styles.listTitle}>{t("home.goalsLists.goals")}</Text>
          </View>
        }
        ListEmptyComponent={
          !isLoading && goals?.length === 0 ?
            <EmptyList
              image="https://odpjykyuzmfjeauhkwhw.supabase.co/storage/v1/object/public/images/notFound.png"
              title={t('home.goalsLists.noGoalsTitle')}
              description={t('home.goalsLists.noGoalsDescription')}
            />
            : null
        }
        refreshControl={
          <RefreshControl tintColor="grey" refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <CreateGoalButton route="/createGoal" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    gap: 20,
  },
  header: {
    paddingVertical: 20,
    gap: 5,
  },
  list: {
    paddingBottom: 200
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});