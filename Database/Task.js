
import { openDB } from "./db";
 
export const InsertUser = async (Nom, Prenom, Email, Telephone, Password) => {
  try {
    const db = await openDB();
    
    if (!db) {
      throw new Error('La base de données n\'est pas disponible');
    }
    
    // Insertion d'un nouveau user
    await db.runAsync(
      'INSERT INTO Users (Nom, Prenom, Email, Telephone, Password) VALUES (?, ?, ?, ?, ?);', 
      [Nom, Prenom, Email, Telephone, Password]
    );
    
    console.log(`✅ Utilisateur "${Nom}" ajouté`);
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion de l\'utilisateur:', error);
    throw error;
  }
};

export const VerifUser = async (Email, Password) => {
  try {
    const db = await openDB();
    
    if (!db) {
      throw new Error('La base de données n\'est pas disponible');
    }
    
    const result = await db.getAllAsync(
      'SELECT * FROM Users WHERE Email = ? AND Password = ?;',
      [Email, Password]
    );
    
    return result;
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de l\'utilisateur:', error);
    throw error;
  }
};