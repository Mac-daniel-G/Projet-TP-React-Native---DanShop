// Contexte/PanierContexte.js
/**
 * IMPORTS
 * 
 * createContext : Crée le contexte React qui permettra de partager le panier
 * useState : Hook pour gérer l'état du panier (liste d'articles)
 * useEffect : Hook pour charger/sauvegarder le panier depuis/dans AsyncStorage
 * 
 * Note : useContext n'est pas importé ici car il est utilisé dans les composants enfants,
 * pas dans ce Provider. Chaque composant qui veut utiliser le panier fera :
 * const { panier, ajouterAuPanier } = useContext(PanierContexte);
 */
import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * EXPLICATION : Création du contexte Panier
 * 
 * Un contexte React permet de partager des données entre plusieurs composants sans avoir à passer
 * des props à chaque niveau de l'arborescence (prop drilling).
 * 
 * Ici, on crée un contexte pour gérer le panier d'achat de manière globale dans toute l'application.
 * Tous les composants enfants pourront accéder au panier et aux fonctions pour le modifier.
 * 
 * La valeur par défaut est importante : elle évite les erreurs si un composant utilise le contexte
 * sans être enveloppé dans le Provider.
 */
export const PanierContexte = createContext({
  panier: [],
  ajouterAuPanier: () => {},
  retirerDuPanier: () => {},
  modifierQuantite: () => {},
  viderPanier: () => {},
  totalArticles: 0,
});

/**
 * EXPLICATION : Composant Provider du contexte Panier
 * 
 * Ce composant enveloppe l'application et fournit le contexte Panier à tous ses enfants.
 * Il gère l'état global du panier et expose les fonctions pour le modifier.
 */
export const PanierProvider = ({ children }) => {
  /**
   * HOOK : useState
   * 
   * POURQUOI utiliser useState ici ?
   * - On a besoin de stocker l'état du panier (liste d'articles) qui peut changer au cours du temps
   * - useState permet de créer un état réactif : quand le panier change, tous les composants
   *   qui l'utilisent seront automatiquement re-rendus
   * - C'est l'état centralisé du panier pour toute l'application
   * 
   * Structure : [panier, setPanier]
   * - panier : la valeur actuelle du panier (tableau d'articles)
   * - setPanier : fonction pour modifier le panier
   */
  const [panier, setPanier] = useState([]);

  /**
   * HOOK : useEffect (premier useEffect - chargement initial)
   * 
   * POURQUOI utiliser useEffect ici ?
   * - On doit charger le panier sauvegardé depuis AsyncStorage au démarrage de l'application
   * - useEffect permet d'exécuter du code après le premier rendu du composant
   * - C'est un "effet de bord" (side effect) : interaction avec le stockage local
   * 
   * POURQUOI le tableau de dépendances est vide [] ?
   * - [] signifie que cet effet s'exécute UNE SEULE FOIS au montage du composant
   * - On ne veut charger le panier qu'une fois au démarrage, pas à chaque rendu
   * 
   * POURQUOI async/await dans useEffect ?
   * - AsyncStorage.getItem() est asynchrone, on doit attendre le résultat
   * - On crée une fonction async interne car useEffect ne peut pas être directement async
   */
  useEffect(() => {
    const chargerPanier = async () => {
      try {
        // Récupérer le panier sauvegardé depuis le stockage local
        const panierSauvegarde = await AsyncStorage.getItem('panier');
        if (panierSauvegarde) {
          // Convertir la chaîne JSON en objet JavaScript
          setPanier(JSON.parse(panierSauvegarde));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
      }
    };
    chargerPanier();
  }, []); // Tableau vide = exécution unique au montage

  /**
   * HOOK : useEffect (deuxième useEffect - sauvegarde automatique)
   * 
   * POURQUOI utiliser useEffect ici ?
   * - On veut sauvegarder automatiquement le panier dans AsyncStorage à chaque fois qu'il change
   * - C'est un "effet de bord" : interaction avec le stockage local
   * - Cela permet la persistance : si l'utilisateur ferme l'app, le panier sera conservé
   * 
   * POURQUOI [panier] dans les dépendances ?
   * - On veut que cet effet s'exécute à CHAQUE FOIS que le panier change
   * - Si on mettait [], il ne s'exécuterait qu'une fois et ne sauvegarderait jamais les modifications
   * - Avec [panier], chaque ajout/suppression/modification déclenche une sauvegarde
   * 
   * POURQUOI pas sauvegarder directement dans les fonctions ?
   * - Cela évite la duplication de code (une seule fonction de sauvegarde)
   * - Séparation des responsabilités : les fonctions modifient l'état, useEffect sauvegarde
   * - Plus maintenable et moins d'erreurs
   */
  useEffect(() => {
    const sauvegarderPanier = async () => {
      try {
        // Convertir le panier (objet JavaScript) en chaîne JSON pour le stockage
        await AsyncStorage.setItem('panier', JSON.stringify(panier));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du panier:", error);
      }
    };
    sauvegarderPanier();
  }, [panier]); // S'exécute à chaque modification du panier

  /**
   * FONCTION : ajouterAuPanier
   * 
   * POURQUOI cette fonction existe ?
   * - Permet d'ajouter un article au panier depuis n'importe quel composant
   * - Centralise la logique d'ajout : évite la duplication de code
   * 
   * POURQUOI utiliser setPanier avec une fonction (prevPanier) ?
   * - setPanier((prevPanier) => ...) garantit qu'on utilise la dernière valeur du panier
   * - Important si plusieurs ajouts se font rapidement (évite les conflits d'état)
   * - C'est la bonne pratique React pour les mises à jour basées sur l'état précédent
   * 
   * POURQUOI vérifier si l'article existe déjà ?
   * - Si l'utilisateur ajoute le même produit deux fois, on augmente la quantité au lieu de créer un doublon
   * - Meilleure expérience utilisateur : un seul article avec quantité = 2
   * 
   * POURQUOI normaliser la structure de l'article ?
   * - Les articles peuvent venir de différentes sources avec des structures différentes
   * - On standardise : id, _id, name, prix, etc. pour garantir la cohérence
   * - Gère les variations : Image vs image, _id vs id
   */
  const ajouterAuPanier = (article) => {
    setPanier((prevPanier) => {
      // Vérifier si l'article existe déjà dans le panier (par _id ou id)
      const articleExistant = prevPanier.find(
        (item) => item._id === article._id || item.id === article._id
      );

      if (articleExistant) {
        // Si l'article existe déjà, augmenter sa quantité au lieu de créer un doublon
        return prevPanier.map((item) =>
          item._id === article._id || item.id === article._id
            ? { ...item, quantite: (item.quantite || 1) + 1 }
            : item
        );
      } else {
        // Si l'article n'existe pas, l'ajouter avec une quantité de 1
        // Normaliser la structure de l'article pour le panier
        // Générer un ID temporaire si l'article n'a pas d'ID
        const articleId = article._id || article.id || `temp-${Date.now()}-${Math.random()}`;
        const nouvelArticle = {
          id: articleId, // Utiliser _id comme id principal, ou générer un ID temporaire
          _id: articleId,
          name: article.name,
          prix: article.prix,
          devise: article.devise || '€',
          description: article.description,
          image: article.Image || article.image, // Gérer les deux cas (Image avec majuscule ou image)
          quantite: 1,
        };
        return [...prevPanier, nouvelArticle];
      }
    });
  };

  /**
   * FONCTION : retirerDuPanier
   * 
   * POURQUOI cette fonction existe ?
   * - Permet de supprimer complètement un article du panier
   * - Centralise la logique de suppression
   * 
   * POURQUOI utiliser filter() ?
   * - filter() crée un nouveau tableau avec tous les éléments SAUF celui à retirer
   * - Méthode immuable : on ne modifie pas directement le tableau, on en crée un nouveau
   * - C'est la bonne pratique React : ne jamais muter directement l'état
   * 
   * POURQUOI vérifier à la fois _id et id ?
   * - Les articles peuvent avoir l'un ou l'autre selon leur source
   * - On veut être sûr de retirer le bon article même si la structure varie
   */
  const retirerDuPanier = (articleId) => {
    setPanier((prevPanier) =>
      // filter() garde tous les articles SAUF celui dont l'ID correspond
      prevPanier.filter(
        (item) => item._id !== articleId && item.id !== articleId
      )
    );
  };

  /**
   * FONCTION : modifierQuantite
   * 
   * POURQUOI cette fonction existe ?
   * - Permet de modifier la quantité d'un article déjà dans le panier
   * - Utilisée quand l'utilisateur clique sur + ou - dans le panier
   * 
   * POURQUOI vérifier si nouvelleQuantite <= 0 ?
   * - Si la quantité devient 0 ou négative, on retire l'article au lieu de le garder avec quantité 0
   * - Logique métier : un article avec quantité 0 n'a pas de sens dans un panier
   * - On réutilise retirerDuPanier() pour éviter la duplication de code
   * 
   * POURQUOI utiliser map() ?
   * - map() crée un nouveau tableau en transformant chaque élément
   * - On trouve l'article à modifier et on change sa quantité, les autres restent inchangés
   * - Méthode immuable : on ne modifie pas directement l'état
   * 
   * POURQUOI { ...item, quantite: nouvelleQuantite } ?
   * - Spread operator (...) copie toutes les propriétés de l'article
   * - On écrase seulement la propriété quantite avec la nouvelle valeur
   * - Les autres propriétés (nom, prix, etc.) restent identiques
   */
  const modifierQuantite = (articleId, nouvelleQuantite) => {
    if (nouvelleQuantite <= 0) {
      // Si la quantité est 0 ou négative, retirer l'article
      retirerDuPanier(articleId);
      return;
    }

    setPanier((prevPanier) =>
      // map() transforme chaque article : celui avec l'ID correspondant voit sa quantité modifiée
      prevPanier.map((item) =>
        item._id === articleId || item.id === articleId
          ? { ...item, quantite: nouvelleQuantite } // Copie l'article et change la quantité
          : item // Les autres articles restent inchangés
      )
    );
  };

  /**
   * FONCTION : viderPanier
   * 
   * POURQUOI cette fonction existe ?
   * - Permet de supprimer tous les articles du panier d'un coup
   * - Utile après une commande réussie ou pour réinitialiser le panier
   * 
   * POURQUOI async/await ?
   * - AsyncStorage.removeItem() est asynchrone, on doit attendre qu'elle se termine
   * - On veut s'assurer que le panier est bien supprimé du stockage local
   * 
   * POURQUOI faire les deux (setPanier([]) ET AsyncStorage.removeItem) ?
   * - setPanier([]) : vide l'état React immédiatement (affichage mis à jour)
   * - AsyncStorage.removeItem() : supprime la sauvegarde persistante
   * - Normalement, le useEffect de sauvegarde s'en chargerait, mais on le fait explicitement
   *   pour être sûr que c'est bien supprimé même si l'utilisateur ferme l'app juste après
   */
  const viderPanier = async () => {
    // Vider l'état React immédiatement
    setPanier([]);
    try {
      // Supprimer aussi la sauvegarde dans AsyncStorage
      await AsyncStorage.removeItem('panier');
    } catch (error) {
      console.error("Erreur lors de la suppression du panier:", error);
    }
  };

  /**
   * CALCUL : totalArticles
   * 
   * POURQUOI calculer totalArticles ici ?
   * - On calcule le nombre total d'articles (somme de toutes les quantités)
   * - Utile pour afficher un badge sur l'icône panier (ex: "3 articles")
   * - Calculé une seule fois ici plutôt que dans chaque composant qui en a besoin
   * 
   * POURQUOI utiliser reduce() ?
   * - reduce() parcourt le tableau et accumule une valeur (ici, la somme des quantités)
   * - Parfait pour calculer un total à partir d'un tableau
   * - Syntaxe : reduce((accumulateur, élément) => ..., valeurInitiale)
   * 
   * POURQUOI (item.quantite || 1) ?
   * - Si un article n'a pas de propriété quantite, on considère qu'il y en a 1
   * - Évite les erreurs si la structure de données est incomplète
   */
  const totalArticles = panier.reduce(
    (total, item) => total + (item.quantite || 1), // Ajouter la quantité de chaque article
    0 // Valeur initiale du total
  );

  /**
   * RENDU : Provider du contexte
   * 
   * POURQUOI retourner un Provider ?
   * - Le Provider enveloppe les composants enfants et leur donne accès au contexte
   * - Tous les composants enfants peuvent utiliser useContext(PanierContexte) pour accéder aux valeurs
   * 
   * POURQUOI passer toutes ces valeurs dans value ?
   * - panier : l'état actuel du panier (lecture)
   * - ajouterAuPanier, retirerDuPanier, etc. : les fonctions pour modifier le panier (écriture)
   * - totalArticles : valeur calculée utile pour l'affichage
   * - Tout ce qui est dans value est accessible depuis les composants enfants
   */
  return (
    <PanierContexte.Provider
      value={{
        panier, // État actuel du panier
        ajouterAuPanier, // Fonction pour ajouter un article
        retirerDuPanier, // Fonction pour retirer un article
        modifierQuantite, // Fonction pour modifier la quantité
        viderPanier, // Fonction pour vider tout le panier
        totalArticles, // Nombre total d'articles (somme des quantités)
      }}
    >
      {children}
    </PanierContexte.Provider>
  );
};

