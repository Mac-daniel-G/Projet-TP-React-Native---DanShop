// App.jsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigation } from './Navigation/DrawerNavigation';
import { UserProvider } from './Contexte/UserContexte';
import { PanierProvider } from './Contexte/PanierContexte';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkUserSession = async () => {
      try {
        const userData = await AsyncStorage.getItem('userSession');
        if (userData) {
          setInitialRoute('Home'); // Rediriger vers l'accueil si déjà connecté
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <UserProvider>
      <PanierProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container} edges={["top", "right", "bottom", "left"]}>
            <StatusBar barStyle="light-content" backgroundColor="#19620cff" translucent={false} />
            <DrawerNavigation initialRouteName={initialRoute} />
          </SafeAreaView>
        </NavigationContainer>
      </PanierProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});