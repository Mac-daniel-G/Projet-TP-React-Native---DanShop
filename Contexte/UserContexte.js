// Contexte/UserContexte.js
import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// CORRECTION : Création du contexte avec une valeur par défaut pour éviter "undefined"
export const UserContexte = createContext({
  user: null,
  setUser: () => {},
  logout: () => {}, // Nouvelle fonction pour la déconnexion
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // CORRECTION : Fonction de déconnexion centralisée
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <UserContexte.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContexte.Provider>
  );
};