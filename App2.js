import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
// import Panier from './screens/Panier';
import { Contact } from './screens/Contact';
// import Home from './screens/Home';
// import EspaceClient from './screens/EspaceClient';
// import { Catalogue } from './screens/Catalogue';
// import { Connexion } from './screens/Connexion';
// import { Inscription } from './screens/Inscription';

export default function App() {
    console.log("App2.js loaded");
  return (
    <View >
      {/* <StatusBar style="auto" /> */}
      <Contact />

    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


