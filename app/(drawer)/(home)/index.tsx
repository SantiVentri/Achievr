import CreateGoalButton from '@/components/createGoalButton';
import { getGoals } from '@/components/data';
import Goal from '@/components/Goal';
import { useUser } from '@/context/UserContext';
import { GoalType } from '@/enums/types';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

const getGreeting = () => {
  const { t } = useTranslation();
  const hour = new Date().getHours();
  if (hour > 5 && hour <= 12) return t("home.greeting.morning")
  if (hour >= 13 && hour <= 19) return t("home.greeting.afternoon")
  return t("home.greeting.evening")
};

export default function Page() {
  const { user } = useUser();
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [doneGoals, setDoneGoals] = useState<GoalType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllGoals = useCallback(async () => {
    if (!user) return;
    const [goals, doneGoals] = await Promise.all([
      getGoals(user, false),
      getGoals(user, true),
    ]);
    setGoals(goals);
    setDoneGoals(doneGoals);
  }, [user]);

  useEffect(() => {
    fetchAllGoals();
  }, [fetchAllGoals]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllGoals();
    setRefreshing(false);
  }, [fetchAllGoals]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>Hi, {user?.user_metadata?.display_name}</Text>
          <Text style={styles.title}>{getGreeting()}</Text>
        </View>
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            keyExtractor={(goal) => goal.id}
            renderItem={({ item }) => <Goal {...item} />}
            ListHeaderComponent={<Text style={styles.listTitle}>Goals:</Text>}
            scrollEnabled={false}
            ListEmptyComponent={<Text>No goals yet</Text>}
          />
          <FlatList
            data={doneGoals}
            keyExtractor={(goal) => goal.id}
            renderItem={({ item }) => <Goal {...item} />}
            ListHeaderComponent={<Text style={styles.listTitle}>Done Goals:</Text>}
            scrollEnabled={false}
            ListEmptyComponent={<Text>No done goals yet</Text>}
          />
        </View>
      </ScrollView>
      <CreateGoalButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
    gap: 20,
  },
  header: {
    gap: 5,
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
  goalsContainer: {
    gap: 16,
  },
});