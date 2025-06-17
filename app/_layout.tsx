import { UserContextProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function RootLayout() {
  return (
    <UserContextProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Stack />
        </View>
      </TouchableWithoutFeedback>
    </UserContextProvider>
  )
}