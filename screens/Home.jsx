// screens/Home.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from '../Styles/Home.style';

const Home = ({ navigation }) => {
   const ACCENT_COLOR = '#255823ff';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.homeContainer}>
        
        {/* Logo */}
        <Image
          source={require('../assets/Magasin Dan Shop.webp')}
          style={styles.homeImage}
          resizeMode="contain"
        />

        {/* Titres */}
        <Text style={styles.homeTitle}>Bienvenue sur DanShop 👋</Text>
        <Text style={styles.homeSubtitle}>Votre boutique en ligne préférée</Text>

        {/* Bouton Primaire : Créer un compte */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Inscription")}
        >
          <Text style={styles.homeButtonText}>Créer un compte</Text>
        </TouchableOpacity>

        {/* Bouton Secondaire : Se connecter */}
        <TouchableOpacity
          style={styles.homeButtonSecondary}
          onPress={() => navigation.navigate("Connexion")}
        >
          <Text style={styles.homeButtonSecondaryText}>Se connecter</Text>
        </TouchableOpacity>

        {/* Texte informatif */}
        <Text style={styles.footerText}>
          Découvrez nos produits et profitez de nos offres exclusives !
        </Text>
      </View>
    </ScrollView>
  );
};

export default Home;