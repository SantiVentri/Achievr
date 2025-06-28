import { UserContextProvider } from "@/context/UserContext";
import '@/i18n';
import { Stack } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserContextProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </TouchableWithoutFeedback>
      </UserContextProvider>
    </GestureHandlerRootView>
  )
}