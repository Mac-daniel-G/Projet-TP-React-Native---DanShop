// screens/Connexion.jsx
import { useContext, useEffect, useState } from "react";
import styles from "../Styles/styles";
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  Pressable, 
  Switch, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator 
} from 'react-native';
import { InitDB } from "../Database/initdb";
import { VerifUser } from "../Database/Task";
import { UserContexte } from "../Contexte/UserContexte";
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_FORM_STATE = {
  email: '',
  motDePasse: '',
};

export const Connexion = ({ navigation }) => {
  // CORRECTION: Tous les hooks doivent être appelés avant tout return conditionnel
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [erreurs, setErreurs] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(UserContexte);
  
  // Vérification du contexte après tous les hooks
  if (!userContext) {
    console.error("UserContexte non disponible");
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Erreur de configuration</Text>
      </View>
    );
  }
  
  const { setUser } = userContext;
  const { email, motDePasse } = formData;

  useEffect(() => {
    const setupDB = async () => {
      try {
        await InitDB();
        // Vérifier si "se souvenir de moi" est activé
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (savedEmail) {
          setFormData(prev => ({ ...prev, email: savedEmail }));
          setIsChecked(true);
        }
      } catch (error) {
        console.error("Erreur DB:", error);
      }
    };
    setupDB();
  }, []);

  const handleChange = (champ, valeur) => {
    setFormData((prev) => ({
      ...prev,
      [champ]: valeur,
    }));

    if (erreurs[champ]) {
      setErreurs((prev) => ({
        ...prev,
        [champ]: "",
      }));
    }
  };

  const validerFormulaire = () => {
    let valide = true;
    let nouvellesErreurs = {};

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nouvellesErreurs.email = "L'email est obligatoire.";
      valide = false;
    } else if (!regexEmail.test(email)) {
      nouvellesErreurs.email = "Format d'email invalide.";
      valide = false;
    }

    if (!motDePasse.trim()) {
      nouvellesErreurs.motDePasse = "Le mot de passe est obligatoire.";
      valide = false;
    }

    setErreurs(nouvellesErreurs);
    return valide;
  };

  const handleConnexion = async () => {
    if (!validerFormulaire()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await VerifUser(email, motDePasse);
      
      if (result && result.length > 0) {
        const user = result[0];
        Alert.alert('Connexion réussie', `Bienvenue ${user.Nom || user.nom || ''}!`);
        
        // Stocker l'utilisateur dans le contexte
        setUser({
          nom: user.Nom || user.nom || '',
          email: user.Email || user.email || email,
          id: user.id || user.ID || null,
        });

        // Gérer "Se souvenir de moi"
        if (isChecked) {
          await AsyncStorage.setItem('rememberedEmail', email);
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
        }

        // Stocker la session
        await AsyncStorage.setItem('userSession', JSON.stringify({
          nom: user.Nom || user.nom || '',
          email: user.Email || user.email || email,
        }));

        // Redirection vers l'accueil principal
        navigation.navigate('Home');
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur connexion:', error);
      Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.titre}>Connexion</Text>
          <Text style={styles.sousTitre}>
            Accédez à votre espace personnel
          </Text>
        </View>

        {/* Champ Email */}
        <View style={styles.champContainer}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, erreurs.email && { borderColor: 'red' }]}
            placeholder="email@exemple.com"
            value={email}
            onChangeText={(valeur) => handleChange("email", valeur)}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />
          {erreurs.email && (
            <Text style={{ color: 'red', fontSize: 12 }}>{erreurs.email}</Text>
          )}
        </View>

        {/* Champ Mot de passe */}
        <View style={styles.champContainer}>
          <Text style={styles.label}>Mot de passe *</Text>
          <TextInput
            style={[styles.input, erreurs.motDePasse && { borderColor: 'red' }]}
            placeholder="Votre mot de passe"
            value={motDePasse}
            onChangeText={(valeur) => handleChange("motDePasse", valeur)}
            secureTextEntry={true}
            autoCapitalize="none"
            editable={!isLoading}
          />
          {erreurs.motDePasse && (
            <Text style={{ color: 'red', fontSize: 12 }}>{erreurs.motDePasse}</Text>
          )}
        </View>

        {/* Option "Se souvenir de moi" */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          marginVertical: 15 
        }}>
          <Switch
            value={isChecked}
            onValueChange={setIsChecked}
            disabled={isLoading}
          />
          <Text style={{ marginLeft: 10 }}>Se souvenir de moi</Text>
        </View>

        {/* Bouton de connexion */}
        <Pressable
          style={({ pressed }) => [
            { 
              backgroundColor: '#255823ff',
              padding: 15,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 20,
              opacity: isLoading ? 0.7 : (pressed ? 0.8 : 1)
            }
          ]}
          onPress={handleConnexion}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              Se connecter
            </Text>
          )}
        </Pressable>

        {/* Lien vers inscription */}
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text>
            Pas encore de compte ?{' '}
            <Text
              style={{ color: '#255823ff', fontWeight: 'bold' }}
              onPress={() => navigation.navigate("Inscription")}
            >
              Créer un compte
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};