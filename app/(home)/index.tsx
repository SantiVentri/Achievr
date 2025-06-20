import CreateGoalButton from '@/components/createGoalButton';
import { getGoals } from '@/components/data';
import Goal from '@/components/Goal';
import { useUser } from '@/context/UserContext';
import { GoalType } from '@/enums/types';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour > 5 && hour <= 12) return "Good Morning"
  if (hour >= 13 && hour <= 19) return "Good Afternoon"
  return "Good Evening"
};

export default function Page() {
  const { user } = useUser();
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [doneGoals, setDoneGoals] = useState<GoalType[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const goals = await getGoals(user, false);
      setGoals(goals);
    };

    const fetchDoneGoals = async () => {
      const goals = await getGoals(user, true);
      setDoneGoals(goals);
    };

    if (user) {
      fetchGoals();
      fetchDoneGoals();
    }
  }, [user]);

  return (
    <View style={styles.container}>
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
          ListEmptyComponent={<Text>No goals yet</Text>}
        />
        <FlatList
          data={doneGoals}
          keyExtractor={(goal) => goal.id}
          renderItem={({ item }) => <Goal {...item} />}
          ListHeaderComponent={<Text style={styles.listTitle}>Done Goals:</Text>}
          ListEmptyComponent={<Text>No done goals yet</Text>}
        />
      </View>
      <CreateGoalButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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