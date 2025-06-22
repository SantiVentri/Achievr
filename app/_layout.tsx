import { UserContextProvider } from "@/context/UserContext";
import '@/i18n';
import { Stack } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function RootLayout() {
  return (
    <UserContextProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </TouchableWithoutFeedback>
    </UserContextProvider>
  )
}