import { useUser } from '@/context/UserContext';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

const getGreeting = () => {
  const { t } = useTranslation();
  const hour = new Date().getHours();
  if (hour > 5 && hour <= 12) return t("home.greeting.morning")
  if (hour >= 13 && hour <= 19) return t("home.greeting.afternoon")
  return t("home.greeting.evening")
};

export default function Page() {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>{t("home.subtitle", { name: user?.user_metadata?.display_name })}</Text>
        <Text style={styles.title}>{getGreeting()}</Text>
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