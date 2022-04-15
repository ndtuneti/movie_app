import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./libs/configFirebase";
import "react-native-gesture-handler";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile";

function Content() {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
      <Navigator>
        <Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Screen options={{ headerShown: false }} name="Profile" component={Profile} />
      </Navigator>
  );
}

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator();
  const [isAuth, setIsAuth] = useState(true);

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsAuth(true);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuth ? (
          <Navigator initialRouteName="Content">
            <Screen name="Content" component={Content} options={{ headerShown: false }} />
          </Navigator>
        ) : (
          <Navigator initialRouteName="Login">
            <Screen name="Login" options={{ headerShown: false }}>
              {({ navigation }) => <Login navigation={navigation} onLogin={handleLogin} />}
            </Screen>
            <Screen name="SignUp" component={SignUp} />
          </Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
