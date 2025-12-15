// Navigation/DrawerNavigation.jsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react'; // AJOUTÉ: Import de useContext
import { Catalogue } from "../screens/Catalogue";
import { Contact } from "../screens/Contact";
import EspaceClient from "../screens/EspaceClient";
import Home from "../screens/Home";
import { TabNavigation } from "./TabNavigation";
import Panier from "../screens/Panier";
import { Inscription } from "../screens/Inscription";
import { Connexion } from "../screens/Connexion";
import { UserContexte } from '../Contexte/UserContexte'; // AJOUTÉ: Import du contexte

const Drawer = createDrawerNavigator();

export const DrawerNavigation = ({ initialRouteName = "Home" }) => {
  const { user, logout } = useContext(UserContexte); // AJOUTÉ: Accès au contexte

  return (
    <Drawer.Navigator 
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#333',
        headerShown: true,
        
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Mon Compte':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            case 'Catalogue':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Panier':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Contact':
              iconName = focused ? 'call' : 'call-outline';
              break;
            case 'Déconnexion':
              iconName = focused ? 'log-out' : 'log-out-outline';
              break;
            case 'Inscription':
              iconName = focused ? 'person-add' : 'person-add-outline';
              break;
            case 'Connexion':
              iconName = focused ? 'log-in' : 'log-in-outline';
              break;
            default:
              iconName = 'alert-circle-outline'; 
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* CORRECTION: L'écran principal conditionnel */}
      {user ? (
        // Si l'utilisateur est connecté, afficher TabNavigation comme écran principal
        <Drawer.Screen 
          name="Home" 
          component={TabNavigation}
          options={{ 
            title: "Accueil",
            headerShown: false // Cache l'en-tête pour TabNavigation
          }}
        />
      ) : (
        // Si l'utilisateur n'est pas connecté, afficher Home comme écran principal
        <Drawer.Screen 
          name="Home" 
          component={Home}
          options={{ 
            title: "Accueil",
            headerShown: false
          }}
        />
      )}

      {/* Écrans accessibles uniquement si connecté */}
      {user && (
        <>
          <Drawer.Screen 
            name="Mon Compte" 
            component={EspaceClient}
            options={{ title: 'Mon Compte' }}
          />

          <Drawer.Screen 
            name="Catalogue" 
            component={Catalogue}
            options={{ title: 'Catalogue' }}
          />
          
          <Drawer.Screen 
            name="Panier" 
            component={Panier}
            options={{ title: 'Panier' }}
          />
        </>
      )}

      {/* Écrans accessibles à tous */}
      <Drawer.Screen 
        name="Contact" 
        component={Contact}
        options={{ title: 'Contact' }}
      />
      
      {/* Écrans d'authentification - masqués du drawer mais accessibles par navigation */}
      <Drawer.Screen 
        name="Inscription" 
        component={Inscription}
        options={{ 
          title: 'Inscription',
          drawerItemStyle: { display: 'none' } // Masque du menu drawer
        }}
      />
      
      <Drawer.Screen 
        name="Connexion" 
        component={Connexion}
        options={{ 
          title: 'Connexion',
          drawerItemStyle: { display: 'none' } // Masque du menu drawer
        }}
      />
      
      {/* CORRECTION: Écran de déconnexion avec gestion conditionnelle */}
      <Drawer.Screen 
        name="Déconnexion" 
        component={Home}
        listeners={({ navigation }) => ({
          drawerItemPress: () => {
            if (user) {
              // Si connecté, déconnecter et rediriger vers Home
              logout();
              navigation.navigate('Home');
            } else {
              // Si déjà déconnecté, juste aller à Home
              navigation.navigate('Home');
            }
          }
        })}
        options={{ 
          title: user ? 'Déconnexion' : 'Connexion',
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  );
};