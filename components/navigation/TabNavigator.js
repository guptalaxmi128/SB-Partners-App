import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "../tabComponent/Home";
import Class from "../tabComponent/Class";
import Cart from "../tabComponent/Cart";
import Profile from "../tabComponent/Profile";
import HomeIcon from "../../assets/nav-icons/home.png";
import SnagIcon from "../../assets/nav-icons/snaglist.png";

import CartIcon from "../../assets/nav-icons/cart.png";
import UserIcon from "../../assets/nav-icons/user.png";
import LiveClasses from "../liveClasses/LiveClasses";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#e08a44",
        tabBarStyle: {
          height: 65,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          elevation: 10,
          backgroundColor: "#ffffff",
        },
        
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          headerShown: false,
          tabBarLabelStyle: { marginTop: 28,fontSize: 12  },
          tabBarLabel: "Home",

          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? HomeIcon : HomeIcon}
              style={{
                width: 25,
                height: 25,
                marginTop: 28,
                // marginRight:25,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Class"
        component={Class}
        options={{
          headerShown: false,
          tabBarLabelStyle: { marginTop: 28,fontSize: 12  },
          tabBarLabel: "Class",

          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? SnagIcon : SnagIcon}
              style={{
                width: 25,
                height: 25,
                marginTop: 28,
                // marginRight:25,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={LiveClasses}
        options={{
          headerShown: false,
          tabBarLabelStyle: { marginTop: 28,fontSize: 12  },
          tabBarLabel: "Cart",

          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? CartIcon : CartIcon}
              style={{
                width: 25,
                height: 25,
                marginTop: 28,
                // marginRight:25,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabelStyle: { marginTop: 28,fontSize: 12  },
          tabBarLabel: "Profile",

          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? UserIcon : UserIcon}
              style={{
                width: 25,
                height: 25,
                marginTop: 28,
                // marginRight:25,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
