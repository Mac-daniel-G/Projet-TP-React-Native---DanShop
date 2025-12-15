
import { useEffect, useState } from "react"; // AJOUTÉ: Import de React pour la bonne pratique (même si non obligatoire)
import styles from "../Styles/styles";
import { View, Text, TextInput, Alert, Pressable, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { InitDB } from "../Database/initdb";
import { InsertUser } from "../Database/Task";

// Définition de l'état initial pour le formulaire
const INITIAL_FORM_STATE = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  motDePasse: '',
  confirmationMotDePasse: '',
};

export const Inscription = ({ navigation }) => {

    // 1. Déclaration de l'état du formulaire (CORRECTION MAJEURE)
    // Hook utilisé : useState
    // Rôle : Stocker les valeurs de l'email et du mot de passe dans un seul objet pour simplifier la gestion.
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    
    // Déstructuration pour un accès facile
    const { nom, prenom, email, telephone, motDePasse, confirmationMotDePasse } = formData;

    // 2. Déclaration de l'état des erreurs
    // Hook utilisé : useState
    // Rôle : Stocker les messages d'erreur de validation pour les afficher sous les champs.
    const [erreurs, setErreurs] = useState({});

    // 3. Déclaration de l'état du Switch "Se souvenir de moi"
    // Hook utilisé : useState
    // Rôle : Gérer l'état (true/false) du composant Switch.
    const [isChecked, setIsChecked] = useState(false);

    // 5. Initialisation de la Base de Données
    // Hook utilisé : useEffect
    // Rôle : Exécuter la fonction InitDB une seule fois au montage du composant ([]). 
    // On l'utilise car l'initialisation de la DB est un effet secondaire (side effect).
    useEffect(() => {
      const setupDB = async () => {
        try {
            // COMMENTAIRE : Initialisation de la base de données SQLite.
            await InitDB();
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la base :", error);
        }
      };
      setupDB();
    }, []);

    // 6. Gestion du changement de champ (CORRECTION)
    const handleChange = (champ, valeur) => {
      // COMMENTAIRE : Met à jour l'objet formData avec la nouvelle valeur.
      setFormData((prev) => ({
        ...prev,
        [champ]: valeur,
      }));

      // COMMENTAIRE : Efface le message d'erreur associé au champ dès qu'il est modifié.
      if (erreurs[champ]) {
        setErreurs((prev) => ({
          ...prev,
          [champ]: "",
        }));
      }
    };

    // 7. Validation du formulaire (NETTOYAGE et AMÉLIORATION)
    const validerFormulaire = () => {
        let valide = true;
        let nouvellesErreurs = {};

        // Vérification des champs VIDES 
        if (!nom) { nouvellesErreurs.nom = "Le nom ne peut pas être vide."; valide = false; }
        if (!prenom) { nouvellesErreurs.prenom = "Le prénom ne peut pas être vide."; valide = false; }
        if (!telephone) { nouvellesErreurs.telephone = "Le téléphone ne peut pas être vide."; valide = false; }
        if (!motDePasse) { nouvellesErreurs.motDePasse = "Le mot de passe ne peut pas être vide."; valide = false; }
        if (!confirmationMotDePasse) { nouvellesErreurs.confirmationMotDePasse = "La confirmation du mot de passe ne peut pas être vide."; valide = false; }
        
        // Validation des REGEX (appliquées uniquement SI les champs ne sont pas vides)
        
        // Validation Nom/Prénom (Autorise les lettres et caractères courants)
        const regexName = /^[A-Za-zÀ-ÿ\s'-]+$/;
        if (nom && !regexName.test(nom)) {
            nouvellesErreurs.nom = 'Le nom est invalide.';
            valide = false;
        }
        if (prenom && !regexName.test(prenom)) { // Utilisation de regexName pour le prénom aussi
            nouvellesErreurs.prenom = 'Le prénom est invalide.';
            valide = false;
        }
        
        // Validation Email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !regexEmail.test(email)) {
            nouvellesErreurs.email = 'L\'email est invalide.';
            valide = false;
        }

        // Validation Téléphone (International: + suivi de 6 à 15 chiffres)
        const regexTelephone = /^\+[0-9]{6,15}$/;  
        if (telephone && !regexTelephone.test(telephone)) {
             nouvellesErreurs.telephone = 'Le numéro de téléphone est invalide (format attendu: +PaysNuméro).';    
             valide = false;
        }
        
        // Validation Mot de passe (12+ carac, Maj, Min, Chiffre, Spécial)
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{12,}$/;
        if (motDePasse && !regexPassword.test(motDePasse)) {
            nouvellesErreurs.motDePasse = 'Le mot de passe doit contenir au moins 12 caractères (Maj, Min, Chiffre).';
            valide = false;
        }

        // 7.3. Validation de la confirmation
        if (motDePasse && confirmationMotDePasse && motDePasse !== confirmationMotDePasse) {
             nouvellesErreurs.confirmationMotDePasse = "Les mots de passe ne correspondent pas.";
             valide = false;
        }

        // 7.4. Validation des conditions d'utilisation
        if (!isChecked) {
            Alert.alert("Attention", "Veuillez accepter les conditions d’utilisation avant de continuer.");
            valide = false;
        }

        setErreurs(nouvellesErreurs);
        return valide;
    };

    // 8. Gestion de l'Inscription'
    const handleInscription = async () => {
        // COMMENTAIRE : Lance la validation avant de contacter la base de données.
        if (!validerFormulaire()) {
            return;
        }

        try {
            // COMMENTAIRE : Appel à la fonction asynchrone pour vérifier l'utilisateur en base.
            const user = await InsertUser(nom, prenom, email, telephone, motDePasse);

            if (user) {
                Alert.alert('Inscription réussie', `Bienvenue ${user.nom}!`);

                // CORRECTION MAJEURE : Réinitialisation de l'état du formulaire
                // On utilise setFormData avec l'état initial.
                setFormData(INITIAL_FORM_STATE);
                setIsChecked(false); 
                // Réinitialiser le Switch aussi
                
                // COMMENTAIRE : Redirige l'utilisateur vers la page de connexion après l'inscription.
                navigation.navigate('Connexion');
            } else {
                Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
                console.error("Échec de l'insertion de l'utilisateur.");
                return;
            }
            console.log("Utilisateur inséré avec succès.");
        } catch (error) {
            console.error('Erreur lors de la vérification :', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription.');
        }
    };


    return (
        // COMMENTAIRE : KeyboardAvoidingView gère le décalage du clavier pour éviter qu'il ne cache les champs.
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={styles.formulaireContainer}
        >
          <ScrollView
          >
            <View style={styles.header}>
                <Text style={styles.titre}>Formulaire d'Inscription</Text>
                <Text style={styles.sousTitre}>
                  Veuillez remplir les champs ci-dessous
                </Text>
            </View>

            {/* Champ Nom */}
            <View style={styles.champContainer}>
                <Text style={styles.label}>Nom *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez votre nom"
                  value={nom}
                  onChangeText={(valeur) => handleChange("nom", valeur)}
                  autoCapitalize="words"
                />
                {erreurs.nom && (
                  <Text style={styles.texteErreur}>{erreurs.nom}</Text>
                )}
            </View>

            {/* Champ Prénom */}
            <View style={styles.champContainer}>
                <Text style={styles.label}>Prénom *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez votre prénom"
                  value={prenom}
                  onChangeText={(valeur) => handleChange("prenom", valeur)}
                  autoCapitalize="words"
                />
                {erreurs.prenom && (
                  <Text style={styles.texteErreur}>{erreurs.prenom}</Text>
                )}
            </View>

            {/* Champ Téléphone */}
            <View style={styles.champContainer}>
                <Text style={styles.label}>Téléphone *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez votre numéro de téléphone"
                  value={telephone}
                  onChangeText={(valeur) => handleChange("telephone", valeur)}
                  keyboardType="phone-pad"
                />
                {erreurs.telephone && (
                  <Text style={styles.texteErreur}>{erreurs.telephone}</Text>
                )}
            </View>

            {/* Champ Email */}
            <View style={styles.champContainer}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez votre email"
                  value={email} //  Utilisation de l'état déstructuré
                  onChangeText={(valeur) => handleChange("email", valeur)}
                  autoCapitalize="none"
                  keyboardType="email-address" //  AJOUTÉ: Aide à la saisie
                />
                {erreurs.email && (
                  <Text style={styles.texteErreur}>{erreurs.email}</Text>
                )}
            </View>

            {/* Champ Mot de passe */}
            <View style={styles.champContainer}>
                <Text style={styles.label}>Mot de passe *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez votre mot de passe"
                  value={motDePasse} //  Utilisation de l'état déstructuré
                  onChangeText={(valeur) => handleChange("motDePasse", valeur)}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                {erreurs.motDePasse && (
                  <Text style={styles.texteErreur}>{erreurs.motDePasse}</Text>
                )}
            </View>

            {/* Champ Confirmation du Mot de passe */}
            <View style={styles.champContainer}>
                <Text style={styles.label}>Confirmation du mot de passe *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirmez votre mot de passe"
                  value={confirmationMotDePasse}
                  onChangeText={(valeur) => handleChange("confirmationMotDePasse", valeur)}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                {erreurs.confirmationMotDePasse && (
                  <Text style={styles.texteErreur}>{erreurs.confirmationMotDePasse}</Text>
                )}
            </View>

            {/* Ajout de la case à cocher */}
            <View style={styles.checkboxContainer}>
              <Switch
                value={isChecked}
                onValueChange={(val) => setIsChecked(val)}
                thumbColor={isChecked ? "#4CAF50" : "#f4f3f4"}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
              />
              <Text style={styles.labelCheckbox}>
                Acceptez la politique de confidentialité 
              </Text>
            </View>

            {/* Bouton de connexion */}
            <Pressable
                style={styles.bouton}
                onPress={handleInscription} // Appel à la méthode d'inscription
            >
                {({ pressed }) => (
                  <Text style={{ color: pressed ? "white" : "white", fontWeight: 'bold' }}>
                    S'inscrire
                  </Text>
                )}
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.texteFooter}>
                Vous avez déjà un compte ?{' '}
                <Text
                style={styles.lien}
                onPress={() => navigation.navigate("Connexion")}
                >
                Se connecter
                </Text>
              </Text>
            </View>

          </ScrollView>
      </KeyboardAvoidingView>
    );
};