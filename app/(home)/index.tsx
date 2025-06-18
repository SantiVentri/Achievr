import CreateGoalButton from '@/components/createGoalButton';
import { useUser } from '@/context/UserContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour > 5 && hour <= 12) return "Good Morning"
  if (hour >= 13 && hour <= 19) return "Good Afternoon"
  return "Good Evening"
};

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Hi, {user?.user_metadata?.display_name}</Text>
        <Text style={styles.title}>{getGreeting()}</Text>
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
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});