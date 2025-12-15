import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export const openDB = async () => {
  try {
    // Réutiliser l'instance existante si elle existe
    if (dbInstance) {
      return dbInstance;
    }
    
    // Ouvrir la base de données
    dbInstance = await SQLite.openDatabaseAsync('MydbInstaTP');
    
    if (!dbInstance) {
      throw new Error('Impossible d\'ouvrir la base de données');
    }
    
    return dbInstance;
  } catch (error) {
    console.error('Erreur lors de l\'ouverture de la base de données:', error);
    throw error;
  }
};