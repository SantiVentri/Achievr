import { useUser } from '@/context/UserContext';
import { GoalType } from '@/types/interfaces';
import { supabase } from '@/utils/supabase';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour > 5 && hour <= 12) return "Good Morning"
  if (hour >= 13 && hour <= 19) return "Good Afternoon"
  return "Good Evening"
};

export default function Page() {
  const { user } = useUser();
  const [goals, setGoals] = useState<GoalType[]>([]);

  const getGoals = async () => {
    const { data, error } = await supabase.from("goals").select("*").eq("creator", user?.id).order("created_at", { ascending: false });
    if (error) {
      console.error(error);
    }
    setGoals(data as GoalType[]);
  }

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Hi, {user?.user_metadata?.display_name}</Text>
        <Text style={styles.title}>{getGreeting()}</Text>
        <Link href={{ pathname: "/(home)/[id]", params: { id: "d2e735c8-268b-42ac-aadf-bc2897150ef2" } }}>Goal</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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