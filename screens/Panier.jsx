import { useState, useCallback, useMemo, useContext, useEffect } from 'react'; // AJOUTÉ: Hooks nécessaires pour la gestion d'état et l'optimisation
import { View, Text, FlatList, TouchableOpacity, Image, Pressable, Alert } from 'react-native'; // 💡 AJOUTÉ: TouchableOpacity/Pressable pour les boutons, Image pour l'affichage produit
import PanierStyles from '../Styles/Panier.styles';
// Import du contexte Panier pour accéder au panier global
import { PanierContexte } from '../Contexte/PanierContexte';

// Fonctions utilitaires de calcul (pour la clarté et l'optimisation)

// Hook useMemo (OPTIMISATION): Mémorise le calcul du total des articles.
// Le calcul ne sera refait que si l'état 'items' (panier) change.
const usePanierTotals = (items) => {
    // Rôle : Calculer le montant total et le nombre total d'articles différents/quantité
    return useMemo(() => {
        let totalAmount = 0;
        let totalQuantity = 0;
        let totalUniqueItems = items.length;

        items.forEach(item => {
            // S'assurer que prix et quantite sont des nombres pour le calcul
            const prix = parseFloat(item.prix || 0);
            const quantite = parseInt(item.quantite || 1); 

            totalAmount += prix * quantite;
            totalQuantity += quantite;
        });

        // Retourne un objet contenant les résultats des calculs
        return { totalAmount, totalQuantity, totalUniqueItems };
    }, [items]); // Dépendance : Recalculer uniquement si la liste des articles change
};

// Composant Panier Principal

const Panier = ({ route }) => {
    // Récupération du panier et des fonctions depuis le contexte global
    const { panier, modifierQuantite, retirerDuPanier } = useContext(PanierContexte);
    
    // Utilisation du panier du contexte au lieu de route.params
    // Le panier est maintenant géré globalement et persiste entre les navigations
    const panierItems = panier;
    
    // 2. Calcul des totaux
    const { totalAmount, totalQuantity, totalUniqueItems } = usePanierTotals(panierItems);


    // 3. Gestion de la quantité d'un article
    // Hook utilisé : useCallback
    // Rôle : Mémoriser la fonction pour éviter sa recréation à chaque rendu, ce qui est crucial 
    // car elle sera passée en prop au composant enfant (FlatList/renderItem).
    const updateQuantity = useCallback((itemId, increment) => {
        // Trouver l'article dans le panier pour obtenir sa quantité actuelle
        const article = panierItems.find(item => (item.id === itemId) || (item._id === itemId));
        if (article) {
            const nouvelleQuantite = (article.quantite || 1) + increment;
            // Utiliser la fonction du contexte pour modifier la quantité
            // Passer l'ID correct (_id ou id selon ce qui existe)
            const idAUtiliser = article._id || article.id;
            modifierQuantite(idAUtiliser, nouvelleQuantite);
        }
    }, [panierItems, modifierQuantite]);

    // 4. Suppression complète d'un article (Optionnel/Intéressant)
    const removeItem = useCallback((itemId) => {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment retirer cet article du panier ?",
            [
                { text: "Annuler", style: "cancel" },
                { 
                    text: "Retirer", 
                    onPress: () => {
                        // Utiliser la fonction du contexte pour retirer l'article
                        retirerDuPanier(itemId);
                    },
                    style: "destructive"
                }
            ]
        );
    }, [retirerDuPanier]);

    // Fonction de rendu d'un article (renderItem)

    // Déplacer le rendu dans une fonction séparée pour la clarté
    const renderCartItem = ({ item }) => {
        // La quantité doit être initialisée à 1 si elle n'existe pas encore.
        const quantite = item.quantite || 1; 
        const prix = parseFloat(item.prix || 0);

        return (
            <View style={PanierStyles.itemContainer}>
                
                {/* Image du produit (Placeholder) */}
                {/* NOTE: Assurez-vous que item.image est une URL valide */}
                {/* Image du produit - gérer les deux cas (image avec minuscule ou Image avec majuscule) */}
                <Image 
                    source={{ uri: item.image || item.Image || 'https://via.placeholder.com/100' }} 
                    style={PanierStyles.itemImage}
                />

                {/* Détails du produit */}
                <View style={PanierStyles.itemDetails}>
                    <Text style={PanierStyles.itemName}>{item.name}</Text>
                    <Text style={PanierStyles.itemPrice}>Prix unitaire: {prix.toFixed(2)} €</Text>
                    <Text style={PanierStyles.itemTotalPrice}>Total: {(prix * quantite).toFixed(2)} €</Text>
                </View>

                {/* Gestion de la quantité */}
                <View style={PanierStyles.quantityControl}>
                    <Pressable 
                        style={PanierStyles.quantityButton} 
                        onPress={() => updateQuantity(item.id || item._id, -1)}
                    >
                        <Text style={PanierStyles.quantityButtonText}>-</Text>
                    </Pressable>
                    
                    <Text style={PanierStyles.quantityText}>{quantite}</Text>
                    
                    <Pressable 
                        style={PanierStyles.quantityButton} 
                        onPress={() => updateQuantity(item.id || item._id, 1)}
                    >
                        <Text style={PanierStyles.quantityButtonText}>+</Text>
                    </Pressable>
                </View>

                 {/* Bouton de Suppression (Optionnel) */}
                <Pressable style={PanierStyles.deleteButton} onPress={() => removeItem(item.id || item._id)}>
                    <Text style={PanierStyles.deleteButtonText}>X</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={PanierStyles.container}>

            {/* Titre */}
            <Text style={PanierStyles.title}>🛒 Mon Panier</Text>

            {/* Liste des articles */}
            {panierItems.length > 0 ? (
                <FlatList
                    data={panierItems}
                    // Utiliser id ou _id comme clé unique, avec une valeur par défaut si les deux sont undefined
                    keyExtractor={(item, index) => {
                        const id = item.id || item._id;
                        return id ? id.toString() : `panier-item-${index}`;
                    }}
                    renderItem={renderCartItem} // Utilisation de la fonction de rendu séparée
                    contentContainerStyle={PanierStyles.list}
                />
            ) : (
                <Text style={PanierStyles.empty}>Votre panier est vide 🛍️</Text>
            )}
            
            {/* FOOTER : Totaux et Action Principale */}
            {panierItems.length > 0 && (
                <View style={PanierStyles.footerContainer}>
                    
                    {/* Statistiques des totaux */}
                    <View style={PanierStyles.summaryBox}>
                        <Text style={PanierStyles.summaryText}>
                            Articles uniques: <Text style={PanierStyles.summaryValue}>{totalUniqueItems}</Text>
                        </Text>
                        <Text style={PanierStyles.summaryText}>
                            Total Quantité: <Text style={PanierStyles.summaryValue}>{totalQuantity}</Text>
                        </Text>
                    </View>

                    {/* Montant Total */}
                    <Text style={PanierStyles.totalAmountText}>
                        TOTAL : <Text style={PanierStyles.totalAmountValue}>{totalAmount.toFixed(2)} €</Text>
                    </Text>

                    {/* Bouton de validation (Passer à la caisse) */}
                    <TouchableOpacity 
                        style={PanierStyles.checkoutButton}
                        onPress={() => Alert.alert("Paiement", "Redirection vers la caisse...")}
                    >
                        <Text style={PanierStyles.checkoutButtonText}>Passer à la caisse</Text>
                    </TouchableOpacity>

                </View>
            )}
        </View>
    );
};

export default Panier;