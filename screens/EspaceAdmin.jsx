// AJOUTÉ : Importation des Hooks nécessaires depuis React
import React, { useState, useEffect, useCallback } from 'react';

// import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import styles from "../Styles/styles";

// AJOUTÉ : Variable pour l'adresse IP de votre API. 
const API_URL = "http://172.20.10.4:3000"; 

// Définition de l'état initial pour le formulaire d'ajout de produit
const INITIAL_FORM_STATE = {
    name: '',
    prix: '', // Stocker en chaîne pour le TextInput
    description: '',
    categorie: '',
    stock: '',
    devise: '',
    image: '', // URL de l'image
};

// AJOUTÉ : Le composant EspaceAdmin est exporté
export const EspaceAdmin = () => {

    // 1. useState : Gérer les données du formulaire
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    // 2. useState : Gérer l'état d'activité lors de l'envoi
    const [isLoading, setIsLoading] = useState(false);

    // 3. useState : Gérer l'état de la liste des produits existants (si affichée)
    const [produits, setProduits] = useState([]);
    
    // AJOUTÉ : État pour gérer les erreurs de chargement de la liste
    const [erreurChargement, setErreurChargement] = useState(null);


    // Gère la modification de n'importe quel champ du formulaire
    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    // AJOUTÉ : Fonction de validation basique pour s'assurer que les champs requis sont remplis
    const validateForm = () => {
        // Validation des champs non vides
        if (!formData.name || !formData.prix || !formData.stock) {
            Alert.alert("Erreur de Validation", "Le nom, le prix et le stock sont requis.");
            return false;
        }
        // Validation des champs numériques
        if (isNaN(parseFloat(formData.prix)) || isNaN(parseInt(formData.stock))) {
            Alert.alert("Erreur de Validation", "Le prix et le stock doivent être des nombres valides.");
            return false;
        }
        return true;
    };


    // 4. useCallback : Mémoriser la fonction de soumission (handleSubmit)
    const handleSubmit = useCallback(async () => {
        if (isLoading) return;

        // AJOUTÉ : Appel à la validation du formulaire avant l'envoi
        if (!validateForm()) return;

        setIsLoading(true);

        // AJOUTÉ : Préparation des données pour la BDD (conversion des chaînes en nombres)
        const dataToSend = {
            ...formData,
            prix: parseFloat(formData.prix),
            stock: parseInt(formData.stock), // Conversion du stock en entier
            // Le champ 'image' du schéma Mongoose devrait être 'Image' (avec I majuscule) si vous respectez le schéma donné précédemment.
            // Si votre schéma est 'image' (minuscule) c'est correct.
        };

        try {
            const response = await fetch(API_URL, { // Utilisation de la constante API_URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend), 
            });

            if (!response.ok) {
                // Tenter de lire le message d'erreur du serveur
                const errorData = await response.json();
                throw new Error(errorData.message || "Échec de l'ajout du produit.");
            }

            const nouveauProduit = await response.json();
            
            // Mettre à jour la liste locale des produits
            setProduits(prev => [...prev, nouveauProduit]); 

            Alert.alert("Succès", `Produit ${nouveauProduit.name} ajouté !`);
            setFormData(INITIAL_FORM_STATE); // Réinitialiser le formulaire

        } catch (error) {
            Alert.alert("Erreur Réseau/Serveur", error.message);
        } finally {
            setIsLoading(false);
        }
    }, [formData, isLoading]); 


    // 5. useEffect : Logique de chargement initial de la liste des produits
    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Erreur de connexion à l'API pour charger les produits.");
                }
                const data = await response.json();
                setProduits(data);
                setErreurChargement(null); // Réinitialiser l'erreur en cas de succès
            } catch (error) {
                // Gestion spécifique des erreurs réseau
                if (error.message === 'Network request failed' || error.name === 'TypeError') {
                    setErreurChargement("Impossible de se connecter au serveur. Vérifiez que le backend est démarré.");
                } else {
                    setErreurChargement(error.message);
                }
                console.error("Erreur lors du chargement des produits:", error);
            }
        };

        fetchProduits();
    }, []); // Dépendance vide : s'exécute une seule fois au montage

    // AJOUTÉ : Affichage d'un message d'erreur si le chargement a échoué
    if (erreurChargement) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Erreur de chargement : {erreurChargement}</Text>
                <Text>Veuillez vérifier que le serveur backend est démarré à l'adresse {API_URL}.</Text>
            </View>
        );
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.containerFormulaireAdmin}>
                <Text style={styles.titleFormulaire}>Bienvenue dans l'Espace Admin</Text>

                {/* --- Section : Ajout de Produit --- */}
                <View style={styles.container}>
                    <Text style={styles.title}>Ajouter un Nouveau Produit</Text>
                    
                    {/* Les TextInput pour tous les champs du formulaire, tous liés à handleInputChange */}
                    
                    <TextInput
                        placeholder="Nom du Produit"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Prix"
                        value={formData.prix}
                        onChangeText={(text) => handleInputChange('prix', text)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Description"
                        value={formData.description}
                        onChangeText={(text) => handleInputChange('description', text)}
                        multiline
                        style={styles.inputMultiline}
                    />
                    <TextInput
                        placeholder="Catégorie"
                        value={formData.categorie}
                        onChangeText={(text) => handleInputChange('categorie', text)}
                        style={styles.input} // Simplification du style
                    />
                    <TextInput
                        placeholder="Stock"
                        value={formData.stock}
                        onChangeText={(text) => handleInputChange('stock', text)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Devise (ex: EUR)"
                        value={formData.devise}
                        onChangeText={(text) => handleInputChange('devise', text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Image URL"
                        value={formData.image}
                        onChangeText={(text) => handleInputChange('image', text)}
                        style={styles.input}
                    />

                    <TouchableOpacity 
                        title={isLoading ? "Ajout en cours..." : "Ajouter le Produit"}
                        onPress={handleSubmit} 
                        disabled={isLoading}
                        style={styles.homeButton}
                    />
                        <Text style={styles.homeButtonText}>Ajouter</Text>

                </View>

                {/* AJOUTÉ : Affichage d'un décompte des produits pour confirmation */}
                <View style={styles.container}>
                    <Text style={styles.title}>Liste des Produits : {produits.length} dans la BDD</Text>
                    {/* Ici, vous ajouteriez le code pour afficher une liste (FlatList) des produits pour la modification/suppression */}
                </View>

            </View>
        </ScrollView>
    );
};