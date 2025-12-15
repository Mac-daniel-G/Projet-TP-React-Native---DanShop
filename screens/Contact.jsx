import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../Styles/styles";


export const Contact = () => {
  return (
    <ScrollView>    
    <View style={styles.container}>
        
        <View style={styles.contactForm}>
            <Text style={styles.title}>Formulaire de Contact</Text>
            <Text style={styles.homeSubtitle}>N'hésitez pas à nous contacter en remplissant le formulaire ci-dessous :</Text>
            <TextInput placeholder="Votre nom" style={styles.inputContact} />
            <TextInput placeholder="Votre email" style={styles.inputContact} keyboardType="email-address" />
            <TextInput 
                placeholder="Votre message" 
                style={[styles.inputContact, { height: 100 }]} 
                multiline 
            />
            <TouchableOpacity style={styles.homeButton}>
                <Text style={styles.homeButtonText}>Envoyer</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.footerContact}>
            <Text style={styles.title}>Contactez-Nous</Text>
            <Text style={styles.text}>Email: contact@danshop.com</Text>   
            <Text style={styles.text}>Téléphone: +33 1 23 45 67 89</Text>
            <Text style={styles.text}>Adresse: 123 Rue de la Mode, Paris, France</Text>
        </View>
    </View>
    </ScrollView>
  );
}