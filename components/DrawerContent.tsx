import { Colors } from "@/constants/palette";
import { useUser } from "@/context/UserContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";
import SignOutButton from "./SignOutButton";

export default function DrawerContent(props: DrawerContentComponentProps) {
    const { user } = useUser();
    const router = useRouter();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const activeRoute = props.state.routes[props.state.index];
    const activeScreen = activeRoute.name;

    const Links = [
        {
            id: 1,
            name: t("drawer.home"),
            icon: "home" as const,
            screen: "(home)",
        },
        {
            id: 2,
            name: t("drawer.news"),
            icon: "newspaper" as const,
            screen: "(news)",
        },
    ]

    const extraLinks = [
        {
            id: 1,
            name: t("drawer.support"),
            icon: "help" as const,
            screen: "(support)",
        },
        {
            id: 2,
            name: t("drawer.feedback"),
            icon: "feedback" as const,
            screen: "(feedback)",
        }
    ]

    const handleRouterPress = (path: string) => {
        setIsLoading(true);
        router.push(path as any);
        props.navigation.closeDrawer();
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.header} onPress={() => handleRouterPress("(home)/account")} disabled={isLoading}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Avatar size={60} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{user?.user_metadata?.display_name}</Text>
                        <Text style={styles.email}>{user?.email}</Text>
                    </View>
                </View>
            </Pressable>
            <View style={styles.divider} />
            <View style={styles.menu}>
                <View style={styles.menuItems}>
                    {Links.map((link) => {
                        const isActive = activeScreen === link.screen;
                        return (
                            <DrawerItem
                                key={link.id}
                                style={[styles.menuItem, { borderColor: isActive ? Colors.primary : "rgb(108, 108, 108)" }]}
                                label={link.name}
                                onPress={() => props.navigation.navigate(link.screen)}
                                labelStyle={[styles.menuItemText, { color: isActive ? Colors.primary : "rgb(108, 108, 108)" }]}
                                activeTintColor={Colors.primary}
                                inactiveTintColor="rgb(108, 108, 108)"
                                icon={() => <MaterialIcons name={link.icon} size={30} color={isActive ? Colors.primary : "rgb(108, 108, 108)"} />}
                            />
                        );
                    })}
                </View>
                <View style={styles.drawerFooter}>
                    <View style={styles.divider} />
                    <View>
                        {extraLinks.map((link) => {
                            const isActive = activeScreen === link.screen;
                            return (
                                <DrawerItem
                                    key={link.id}
                                    label={link.name}
                                    onPress={() => props.navigation.navigate(link.screen)}
                                    labelStyle={[styles.menuItemText, { color: isActive ? Colors.primary : "#2a2a2a" }]}
                                    activeTintColor={Colors.primary}
                                    inactiveTintColor="#2a2a2a"
                                    icon={() => <MaterialIcons name={link.icon} size={30} color={isActive ? Colors.primary : "#2a2a2a"} />}
                                />
                            )
                        })}
                    </View>
                    <SignOutButton />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    nameContainer: {
        gap: 5,
    },
    email: {
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#E0E0E0",
    },
    menuItems: {
        gap: 10,
    },
    menu: {
        flex: 1,
        justifyContent: "space-between",
    },
    menuItem: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "rgb(196, 196, 196)",
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    drawerFooter: {
        gap: 10,
    },
});