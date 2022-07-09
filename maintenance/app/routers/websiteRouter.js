const { Router } = require('express');

const validator = require('../validation/validator');
const schemaPostNewIncident = require('../validation/schemas/schemaPostNewIncident');
const schemaPostUpdateIncident = require('../validation/schemas/schemaPostUpdateIncident');
const middlewareWrapper = require('../middlewares/wrapper');

const incidentController = require('../controllers/incident');

const router = Router();

// Listing des incidents en cours
router.get('/', middlewareWrapper(incidentController.readAll));  // => Render HTML

// Formulaire d'ouverture d'incident
router.get('/incident/new', middlewareWrapper(incidentController.newForm));  // => Render HTML

// Cible du formulaire de création d'incident, crée l'incident puis redirige sur la page de cet incident
router.post('/incident/new', validator('body', schemaPostNewIncident),middlewareWrapper(incidentController.postNewIncident));  //  => redirection HTTP

// Détails d'un incident + formulaire pour changer son avancement, assigner un technicien ou fermer l'incident
router.get('/incident/:id(\\d+)', middlewareWrapper(incidentController.readOne));  // => Render HTML

// Cible du formulaire de modification d'incident, répercute les changements et redirige sur la page incident
router.post('/incident/:id(\\d+)', validator('body', schemaPostUpdateIncident), middlewareWrapper(incidentController.update));   // =>  Redirection HTTP






module.exports = router;