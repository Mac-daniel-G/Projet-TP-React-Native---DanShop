import { FlatList, Text, TextInput, View } from "react-native";
import { styles } from "../Styles/Catalogue.style";
import { ArticleItem } from './ArticleItem';
import { useState, useEffect, useMemo, useContext } from 'react';
import { UserContexte } from '../Contexte/UserContexte';
import React from "react"; // Bonne pratique, même si les Hooks sont importés

export const Catalogue = ({ navigation }) => {
    
 
    // 1. DÉCLARATION DES HOOKS (DOIVENT ÊTRE EN TÊTE)
 
    const [produits, setProduits] = useState([]);
    const [erreur, setErreur] = useState(null);
    const [recherche, setRecherche] = useState("");
    const [chargementInitial, setChargementInitial] = useState(true);

    // Accès au Contexte (Gère le cas où le Provider est manquant)
    const context = useContext(UserContexte);
    // Assurez-vous que l'objet user est récupéré sans erreur
    const user = context ? context.user : null; 

    // Mémorisation du filtrage des produits
    const produitsFiltres = useMemo(() => produits.filter(p =>
        (p.name?.toLowerCase() || '').includes(recherche.toLowerCase())
    ), [produits, recherche]);


 
    // 2. LOGIQUE DE REDIRECTION (Authentification)
 
    useEffect(() => {
        // Si le contexte n'existe pas ou si l'utilisateur n'est pas connecté
        if (!context || user === null) { 
            // Si on sait que le chargement initial est terminé et que l'utilisateur est null, on redirige
            if (!chargementInitial) {
                // Utiliser replace pour empêcher le retour à l'écran de catalogue
                navigation.replace('Connexion'); 
            }
        } else {
            // Si l'utilisateur est connecté, on désactive le chargement initial
            setChargementInitial(false);
        }
    }, [user, navigation, context, chargementInitial]);


 
    // 3. LOGIQUE DE CHARGEMENT DES DONNÉES
 
    useEffect(() => {
        // On ne charge les produits que si l'utilisateur est connecté
        if (!user) return; 

        const chargerProduits = async () => {
            try {
                // ATTENTION: Vérifiez toujours l'IP locale (10.0.2.2 pour émulateur Android)
                const reponse = await fetch("http://172.20.10.4:3000/api/produits");
                
                if (!reponse.ok) {
                    throw new Error(`Erreur HTTP: ${reponse.status}`);
                }
                
                const data = await reponse.json();
                setProduits(data);
                setErreur(null); 
            } catch (err) {
                // Gestion spécifique des erreurs réseau
                let messageErreur = "Une erreur est survenue lors du chargement.";
                if (err.message.includes('Network request failed') || err.name === 'TypeError') {
                    messageErreur = "Impossible de se connecter au serveur. Vérifiez que le backend est démarré et que l'IP est correcte.";
                } else if (err.message.includes('HTTP')) {
                    messageErreur = err.message;
                }
                setErreur(messageErreur);
                console.error("Erreur de chargement des produits:", err);
            }
        };

        chargerProduits();
    }, [user]); // Re-charge si l'utilisateur change (ex: déconnexion/reconnexion)

    // Fonction de rendu des éléments de la FlatList
    const renderItem = ({ item }) => {
        return <ArticleItem item={item} navigation={navigation} />;
    };

 
    // 4. RETOURS CONDITIONNELS
 

    // Affiche un écran vide/chargement tant que la vérification est en cours
    if (chargementInitial || user === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Vérification de l'authentification...</Text>
            </View>
        );
    }
    
    // Affiche l'erreur si elle existe
    if (erreur) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={styles.erreur}> Erreur de Connexion :</Text>
                <Text style={{ textAlign: 'center', color: 'gray', marginTop: 10 }}>{erreur}</Text>
            </View>
        );
    }

    // 5. RENDU PRINCIPAL

    return (
        <View style={{ marginTop: 10, padding: 10, flex: 1 }}>
            <TextInput
                placeholder="Rechercher un produit..."
                value={recherche}
                onChangeText={setRecherche}
                style={styles.rechercheInput}
            />

            <FlatList
                data={produitsFiltres}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                ListEmptyComponent={
                    recherche.length > 0
                        ? <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucun produit ne correspond à "{recherche}".</Text>
                        : <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucun produit disponible.</Text>
                }
            />
        </View>
    );
};