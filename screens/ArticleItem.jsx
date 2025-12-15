// screens/ArticleItem.jsx
import { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from '../Styles/Catalogue.style';
// Import du contexte Panier pour gérer l'ajout d'articles
import { PanierContexte } from '../Contexte/PanierContexte';

export const ArticleItem = ({ item, navigation }) => {
  const [showDescription, setShowDescription] = useState(false);
  
  // Récupération de la fonction ajouterAuPanier depuis le contexte
  const { ajouterAuPanier: ajouterAuPanierContext } = useContext(PanierContexte);
  
  const toggleDescription = () => {
    setShowDescription(prev => !prev);
  };

  // Fonction pour ajouter l'article au panier via le contexte
  const ajouterAuPanier = () => {
    Alert.alert(
      "Ajouter au panier",
      `Voulez-vous ajouter "${item.name}" à votre panier ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Ajouter", 
          onPress: () => {
            // Ajouter l'article au panier via le contexte (état global)
            ajouterAuPanierContext(item);
            // Afficher un message de confirmation
            Alert.alert("Succès", `${item.name} a été ajouté au panier !`);
            // Optionnel : naviguer vers le panier pour voir l'article ajouté
            // navigation.navigate('Panier');
          }
        }
      ]
    );
  };
    
  return (
    <View style={styles.articleContainer}>
      <Image source={{ uri: item.Image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.prix}>{item.prix} {item.devise}</Text>
        <View style={styles.boutonsContainer}>
          <TouchableOpacity 
            onPress={ajouterAuPanier}
            style={styles.ajouterButton}
          >
            <Text style={styles.ajouterButtonText}>Ajouter au Panier</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={toggleDescription}
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>
              {showDescription ? "Masquer" : "Détails"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailleArticleContainer}>
          {showDescription && <Text style={styles.description}>{item.description}</Text>}
        </View>
      </View>
    </View>
  );
};