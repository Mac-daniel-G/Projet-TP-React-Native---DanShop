import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f4ececff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
  },

  button: {
  marginTop: 10,
  backgroundColor: '#255823ff',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
homeContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#ffffff',
},

homeTitle: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 10,
},

homeSubtitle: {
  fontSize: 16,
  color: '#666',
  marginBottom: 30,
},

homeButton: {
  marginTop: 10,
  backgroundColor: '#255823ff',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
},

homeButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},

homeButtonSecondary: {
  width: '80%',
  padding: 15,
  borderRadius: 8,
  backgroundColor: '#ddd',
  alignItems: 'center',
},

homeButtonSecondaryText: {
  color: '#333',
  fontSize: 16,
  fontWeight: 'bold',
},

bouton: {
  marginTop: 10,
  backgroundColor: '#255823ff',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
},

texteBouton: {
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
}, 

logoContainer: {
  width: 100, 
  height: 100, 
  marginBottom: 20 
},

logoutButton: {
  marginTop: 30,
  backgroundColor: '#ff4d4d',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  onHover: { 
    backgroundColor: '#e81111ff',
    borderRadius: 10,
  }
},

homeImage: {
  width: 150,
  height: 150,
  marginBottom: 20,
},

formulaireContainer: {
  flex: 1,
  padding: 20,
  color: '#21561bff',
  backgroundColor: '#efefefff',
  borderRadius: 10,
},

footerContact: {
  padding: 20,
  backgroundColor: '#f8f8f8',
},

lien: {
  color: '#255823ff',
  textDecorationLine: 'underline',
  fontWeight: '600', 
},

footerText: {
  textAlign: 'center',
  color: '#666666',
},

inputContact: {
  borderWidth: 1,
  borderColor: '#21561bff',
  padding: 12,
  marginBottom: 15,
  borderRadius: 5,
  backgroundColor: '#ffffff',
  textAlignVertical: 'top',
},

// --- Conteneur Général ---
    scrollContainer: { 
        backgroundColor: '#93a88aff', // Fond légèrement gris pour le contraste
        paddingBottom: 40, // Espace en bas pour le défilement
        marginTop: 20,  
        marginBottom: 20,
        alignItems: 'center',
    },

    // --- Typographie ---
    title: {
        // AJOUTÉ : Style pour le titre de l'écran et des sections
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50', // Couleur foncée
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'center',
    },

    // --- Conteneur de Section (Ajout de Produit) ---
    container: {
        // AJOUTÉ : Conteneur pour encadrer le formulaire
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        // Ombre légère pour une apparence de carte (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        // Ombre pour Android
        elevation: 3, 
    },

    // --- TextInput (Entrée de texte simple) ---
    input: {
        // AJOUTÉ : Style standard pour les champs de formulaire courts (Nom, Prix, Stock, Devise, URL)
        borderWidth: 1,
        borderColor: '#bdc3c7', // Gris clair
        borderRadius: 5,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },

    // --- TextInput Multiligne (Description) ---
    inputMultiline: {
        // AJOUTÉ : Style pour les champs multilignes (Description)
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        minHeight: 80, // Hauteur minimale pour le champ de description
        textAlignVertical: 'top', // Assure que le texte commence en haut sur Android
        backgroundColor: '#fff',
    },

    // --- Style pour les messages de succès ou d'erreur (si utilisés) ---
    message: {
        fontSize: 14,
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    
    // Si vous utilisez ces styles pour les messages d'alerte visuels:
    successMessage: {
        color: 'green',
        backgroundColor: '#e6ffe6',
    },
    errorMessage: {
        color: 'red',
        backgroundColor: '#ffe6e6',
    },

    titleFormulaire: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000ff',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 30,
    },

  containerFormulaireAdmin: {
    flex: 1,
    padding: 20,
    backgroundColor: '#93a88aff', 
    borderRadius: 10,
  },

  articleContainer: {
    flexDirection: 'row',
    padding: 10,  
  }, 

  champContainer: {
    flexDirection: 'column',
    marginBottom: 5, 
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 5,
  },

  input: {
    flex: 1,
    borderWidth: 1, 
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,   
    backgroundColor: '#fff',
  },
 header: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 30,
  },  
  titre: {
    fontSize: 24,
    fontWeight: 'bold',   
    color: '#000',
  },
  sousTitre: {
    fontSize: 16,
    color: '#555',  
  },  
  label: {
    fontSize: 16,
    marginBottom: 5,  
    color: '#333',
  },
  texteErreur: {
    color: 'red',
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },  

  texteFooter: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
  },  

  footer:{
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10, 
  },

  //Mes styles manquants :
  inputErreur: {
    borderColor: 'red',
    borderWidth: 1,
  },
  boutonPresse: {
    opacity: 0.8,
  },
  infoBox: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },

});
