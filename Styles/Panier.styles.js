import { StyleSheet } from 'react-native';

const PanierStyles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Fond clair
        paddingTop: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    empty: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 50,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#EEE', // Couleur de fond pour le placeholder
    },
    itemDetails: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
    },
    itemTotalPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF', // Prix total en bleu
        marginTop: 2,
    },

    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        marginRight: 5,
    },
    quantityButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#F0F0F0',
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    quantityText: {
        paddingHorizontal: 12,
        fontSize: 16,
        minWidth: 30,
        textAlign: 'center',
    },
    
    // Bouton de suppression
    deleteButton: {
        padding: 5,
        backgroundColor: '#FF3B30', // Rouge pour suppression
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },

    // Footer (Totaux et Bouton de Caisse)
    footerContainer: {
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        padding: 15,
        backgroundColor: '#FFF',
    },
    summaryBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
        marginBottom: 15,
    },
    totalAmountValue: {
        color: '#4CAF50', // Vert pour le montant final
        fontSize: 24,
    },
    checkoutButton: {
        backgroundColor: '#4CAF50', // Vert pour l'action principale
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    checkoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PanierStyles;