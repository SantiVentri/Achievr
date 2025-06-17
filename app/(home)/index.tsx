import { useUser } from '@/context/UserContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text>Hola, {user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 20,
  },
});