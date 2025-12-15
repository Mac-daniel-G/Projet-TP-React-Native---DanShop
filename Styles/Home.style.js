
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // ----------------------------------------------------
    // Conteneur principal (balise View)
    // ----------------------------------------------------
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },

    // ----------------------------------------------------
    // Styles pour l'Image (balise Image)
    // ----------------------------------------------------
    homeImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },

    // ----------------------------------------------------
    // Styles des Textes (balise Text)
    // ----------------------------------------------------
    homeTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
        textAlign: 'center',
    },
    homeSubtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 40,
        textAlign: 'center',
    },
    
    // ----------------------------------------------------
    // Boutons (balise TouchableOpacity)
    // ----------------------------------------------------
    
    // Bouton Primaire (Créer un compte)
    homeButton: {
        backgroundColor: '#255823ff', // Vert
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
        // box-shadow pour le style primaire
        shadowColor: '#4CAF50',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        // elevation: 10,
    },
    homeButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    
    // Bouton Secondaire (Se connecter)
    homeButtonSecondary: {
        backgroundColor: 'transparent', // Transparent
        borderColor: '#007AFF',
        borderWidth: 2, 
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
    },
    homeButtonSecondaryText: {
        color: '#111111ff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    // Texte en bas de page
    footerText: {
        marginTop: 30,
        fontSize: 17,
        color: '#AAAAAA',
        fontWeight: 'italic',
    },

    scrollContainer: {
        backgroundColor: '#93a88aff', // Fond légèrement gris pour le contraste
        padding: 10, // Espace en bas pour le défilement
        margin: 20,  
        alignItems: 'center',
    },
});
