/**
 * Plutôt que créer et connecter un Client on va plutôt créer un "pool" de client et laisser notre module gérer 
 * les connexions de plusieurs clients en fonction des besoins. Le package pg étant bien fait, pas besoin de changer 
 * autre chose. l'objet de pool à aussi une méthode query donc le reste de notre code continuera de fonctionner.
 * Comme pour Client les informations de connexion sont lues soit directement à partir de l'env soit données en paramêtre
 */
 const debug = require('debug')('SQL:log');
 // tableau de client, on va pouvoir exécuter plusieurs requêtes
 const { Pool } = require('pg');
 
 const config = {
     connectionString: process.env.DATABASE_URL,
     max: 90 // Nombre max de connections (attention postgres n'en autorise que 100 et Il ne faut pas mettre le max)
 };
 
 if (process.env.NODE_ENV === 'production') {
     // petit truc de config pour la version en prod sur heroku ça nous évitera des messages d'erreurs concernant ssl
     config.ssl = { rejectUnauthorized: false };
 }
 
 const pool = new Pool(config);
 
 
 module.exports = {
     originalClient: pool, // On expose quand même le client original "au cas ou"
     // On fait une méthode pour "intercepter" les requêtes afin de pouvoir les afficher
     // Le spread operator de "rest" permet de transformer X variables en param. en un tableau
     async query(...params) {
         debug(...params);
         // L'opérateur ici fait l'effet inverse on transforme un tableau en une liste
         // de variables / paramétres ce qui fait que la méthode query du client sera
         // appelée exactement de la même façon que celle de notre module
         return this.originalClient.query(...params);
     },
 };
 
 // TODO : exemple 1
 
 // query('SELECT * FROM post');
 // pool.query('SELECT * FROM post');
 
 // TODO : exemple 2
 
 // query('SELECT * FROM post WHERE category_id=$1', [1]);
 // const params = ['SELECT * FROM post WHERE category_id=$1', [1]]
 // pool.query('SELECT * FROM post WHERE category_id=$1', [1])
 