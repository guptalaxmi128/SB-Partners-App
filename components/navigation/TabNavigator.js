import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "../tabComponent/Home";
import Class from "../tabComponent/Class";
import Cart from "../tabComponent/Cart";
import Profile from "../tabComponent/Profile";
import HomeIcon from "../../assets/nav-icons/home.png";
import HomeActive from "../../assets/nav-icons/homeActive.png";
import SnagIcon from "../../assets/nav-icons/booking.png";
import SnagActive from "../../assets/nav-icons/bookingActive.png";

import CartIcon from "../../assets/nav-icons/notification.png";
import CartActive from "../../assets/nav-icons/notificationActive.png";
import UserIcon from "../../assets/nav-icons/user.png";
import UserActive from "../../assets/nav-icons/profileActive.png";
import LiveClasses from "../liveClasses/LiveClasses";
import MainBooking from "../booking/MainBooking";
import Notification from "../notification/Notification";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#5F33E1",
        tabBarInactiveTintColor:"#5F33E1",
        tabBarStyle: {
          height: 66,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          elevation: 10,
          backgroundColor: "#ffffff",
          borderTopLeftRadius:25,
          borderTopRightRadius:25
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
              source={focused ? HomeActive : HomeIcon}
              style={{
                width: 26,
                height: 26,
                marginTop: 26,
                // marginRight:25,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        // name="Class"
        // component={Class}
        name="Booking"
        component={MainBooking}
        options={{
          headerShown: false,
          tabBarLabelStyle: { marginTop: 28,fontSize: 12  },
          tabBarLabel: "Booking",

          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? SnagActive : SnagIcon}
              style={{
                width: 26,
                height: 26,
                marginTop: 26,
                // marginRight:25,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        // component={LiveClasses}
        component={Notification}
        options={{
          headerShown: false,
          tabBarLabelStyle: { marginTop: 28,fontSize: 12  },
          tabBarLabel: "Notification",

          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? CartActive : CartIcon}
              style={{
                width: 25,
                height: 26,
                marginTop: 26,
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
              source={focused ? UserActive : UserIcon}
              style={{
                width: 26,
                height: 26,
                marginTop: 26,
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
