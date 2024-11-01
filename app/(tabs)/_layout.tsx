import { Tabs } from "expo-router";
import React from "react";

import { IoniconsTabBarIcon, MatCommunityTabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="customers"
        options={{
          title: "לקוחות",
          tabBarIcon: ({ color, focused }) => (
            <IoniconsTabBarIcon
              name={focused ? "people" : "people-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "הזמנות",
          tabBarIcon: ({ color, focused }) => (
            <IoniconsTabBarIcon
              name={focused ? "receipt" : "receipt-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="distributionLine"
        options={{
          title: "קו חלוקה",
          tabBarIcon: ({ color, focused }) => (
            <MatCommunityTabBarIcon
              name={focused ? "truck-fast" : "truck-fast-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "בית",
          tabBarIcon: ({ color, focused }) => (
            <IoniconsTabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
