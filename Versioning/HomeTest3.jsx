
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles/styles';

const Home = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      {/* Logo de l'application */}
      <Image
        source={require('../assets/Magasin Dan Shop.webp')}
        style={styles.homeImage}
      />

      <Text style={styles.homeTitle}>Bienvenue To DanShop👋</Text>
      <Text style={styles.homeSubtitle}>Choisissez une action</Text>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Inscription")}
      >
        <Text style={styles.homeButtonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButtonSecondary}
        onPress={() => navigation.navigate("Connexion")}
      >
        <Text style={styles.homeButtonSecondaryText}>Se connecter</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Home;
