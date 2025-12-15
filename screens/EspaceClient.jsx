// screens/EspaceClient.jsx
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from "../Styles/styles";
import { useContext } from 'react';
import { UserContexte } from '../Contexte/UserContexte';

export default function EspaceClient({ navigation }) {
  const { user, logout } = useContext(UserContexte);

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Déconnexion", 
          onPress: () => {
            logout();
            navigation.navigate('Home');
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Espace Client</Text>

      <View style={{ 
        backgroundColor: '#f8f8f8', 
        padding: 20, 
        borderRadius: 10, 
        marginBottom: 20 
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Informations personnelles
        </Text>
        
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', color: '#666' }}>Nom :</Text>
          <Text style={{ fontSize: 16 }}>{user?.nom ?? 'Non disponible'}</Text>
        </View>
        
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', color: '#666' }}>Email :</Text>
          <Text style={{ fontSize: 16 }}>{user?.email ?? 'Non disponible'}</Text>
        </View>
      </View>

      {/* Bouton Se déconnecter */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}