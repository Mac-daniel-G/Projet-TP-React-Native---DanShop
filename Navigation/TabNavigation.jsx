// Navigation/TabNavigation.jsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react'; // AJOUTÉ: Import pour vérifier l'authentification

// Import des écrans
import { Catalogue } from "../screens/Catalogue";
import EspaceClient from "../screens/EspaceClient";
import Panier from "../screens/Panier";
import Home from "../screens/Home";
import { UserContexte } from '../Contexte/UserContexte'; // AJOUTÉ: Import du contexte
import { PanierContexte } from '../Contexte/PanierContexte'; // Import du contexte Panier pour accéder au nombre d'articles

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  // Récupération du contexte utilisateur pour vérifier l'authentification
  const { user } = useContext(UserContexte);
  
  // Récupération du contexte panier pour obtenir le nombre total d'articles
  // totalArticles : somme de toutes les quantités d'articles dans le panier
  const { totalArticles } = useContext(PanierContexte);

  // CORRECTION: Si l'utilisateur n'est pas connecté, rediriger vers Home
  if (!user) {
    return <Home />;
  }

  return (
    <Tab.Navigator
      initialRouteName="AccueilTab"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666', 
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingVertical: 5,
          height: 60,
        },
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          switch (route.name) {
            case 'Mon Compte':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            case 'Catalogue':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Panier':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'AccueilTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            default:
              iconName = 'alert-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* CORRECTION: Réorganisation des onglets */}
      <Tab.Screen 
        name="Catalogue" 
        component={Catalogue} 
        options={{ 
          title: 'Produits',
          headerShown: false // L'en-tête est géré par Drawer
        }} 
      />
      
      <Tab.Screen 
        name="Panier" 
        component={Panier} 
        options={{ 
          title: 'Panier',
          // Badge dynamique : affiche le nombre réel d'articles dans le panier
          // Si totalArticles > 0, affiche le nombre, sinon pas de badge (undefined)
          // Le badge se met à jour automatiquement quand le panier change grâce au contexte
          tabBarBadge: totalArticles > 0 ? totalArticles : undefined,
          headerShown: false
        }}
      />
      
      <Tab.Screen 
        name="Mon Compte" 
        component={EspaceClient} 
        options={{ 
          title: 'Mon Compte',
          headerShown: false
        }}
      />
      
      <Tab.Screen 
        name="AccueilTab" 
        component={Home}
        options={{ 
          title: 'Accueil',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};