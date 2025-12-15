import { openDB } from './db';

// Variable pour éviter les initialisations multiples simultanées
let isInitializing = false;
let initializationPromise = null;

export const InitDB = async () => {
  // Si une initialisation est déjà en cours, attendre qu'elle se termine
  if (isInitializing && initializationPromise) {
    return initializationPromise;
  }

  // Créer une nouvelle promesse d'initialisation
  initializationPromise = (async () => {
    try {
      isInitializing = true;
      const db = await openDB();
      
      if (!db) {
        throw new Error('La base de données n\'a pas pu être ouverte');
      }
   
      // Utilisation de runAsync pour créer la table
      await db.runAsync(`
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Nom TEXT,
          Prenom TEXT,
          Email TEXT,
          Telephone TEXT,
          Password TEXT
        );
      `);
   
      console.log('✅ Table "Users" créée avec succès');
      isInitializing = false;
      return true;
    } catch (error) {
      isInitializing = false;
      console.error(' Erreur lors de l\'initialisation de la base de données:', error);
      throw error;
    }
  })();

  return initializationPromise;
};
 