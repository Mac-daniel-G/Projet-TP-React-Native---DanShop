// import { Connexion } from './screens/Connexion';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Inscription } from "./screens/Inscription"
import { NavigationContainer } from "@react-navigation/native";
import { Connexion } from "./screens/Connexion";
import EspaceClient from "./screens/EspaceClient";
import { UserProvider } from "./Contexte/UserContexte";
import Home from "./screens/Home";
import { Catalogue } from "./screens/Catalogue";
import Panier from "./screens/Panier";
import { Contact } from "./screens/Contact";


const Stack = createNativeStackNavigator();

export const App=() =>{

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Connexion" 
            component={Connexion} 
            options={{ title: 'Se connecter' }}  
          />
          <Stack.Screen 
            name="Inscription" 
            component={Inscription} 
            options={{ title: 'Créer un compte' }}
          />
          <Stack.Screen 
            name="EspaceClient" 
            component={EspaceClient} 
          />
          <Stack.Screen 
            name="Home" 
            component={Home} 
          />
          <Stack.Screen 
            name="Catalogue" 
            component={Catalogue} 
          />
          <Stack.Screen
            name="Panier" 
            component={Panier}
          />
          <Stack.Screen
            name="Contact"
            component={Contact}
          />
        </Stack.Navigator>
      </NavigationContainer>
  </UserProvider>

  )
    
}

