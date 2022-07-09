const dataMapperIncident = require('../dataMapper/incident.js');
const WebsiteError = require('../errors/websiteError');
const debug = require('debug')('incidentController');

const incident = {
    async readAll (req, res) {
        debug('readAll')
        const results = await dataMapperIncident.readAll();
        return res.render('home', {results});
    },

    async readOne (req, res) {
        debug('readOne')
        const result = await dataMapperIncident.readOne(req.params.id);
        if (!result) throw new WebsiteError('Incident not found', { statusCode: 404 });
        return res.render('update', {result});
    },

    async update (req, res, next) {
        debug('update')
        const exist = await dataMapperIncident.readOne(req.params.id);
        if (!exist) throw new WebsiteError('Incident not found', { statusCode: 404 });
        const result = await dataMapperIncident.update(req.params.id, req.body);
        return res.redirect('/');
    },
    async newForm (req, res, next) {
        debug('newForm')
        return res.render('new');
    },
    async postNewIncident(req, res, next) {
        debug('postNewIncident')
        const newIncident = await dataMapperIncident.insertIncident(req.body);
        res.redirect('/')
        // res.send(newIncident);
        // res.send ('post new incident a construire')
    },
}

module.exports = incident;