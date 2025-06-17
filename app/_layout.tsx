import { UserContextProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function RootLayout() {
  return (
    <UserContextProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </TouchableWithoutFeedback>
    </UserContextProvider>
  )
}