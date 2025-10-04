### Checklist Sécurité Simple pour JavaScript

1. Validation des entrées
   - Utiliser des fonctions pour vérifier le type et le format des données reçues (ex : typeof, Array.isArray, regex).

2. Éviter l’exécution de code non contrôlé
   - Ne jamais utiliser eval() ou Function() avec des entrées utilisateur.

3. Utiliser des requêtes paramétrées
   - Pour les bases de données, toujours utiliser des requêtes préparées pour éviter les injections SQL.

4. Protéger contre le Cross Site Scripting (XSS)
   - Échapper les données avant de les afficher dans le DOM.

5. Gérer les erreurs proprement
   - Ne pas afficher d’informations techniques sensibles dans les messages d’erreur.

6. Mettre à jour les dépendances
   - Vérifier régulièrement les vulnérabilités avec npm audit ou yarn audit.
