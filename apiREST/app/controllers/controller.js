const dataMapper = require('../dataMapper/dataMapper.js');
const ApiError = require('../errors/apiError');
const { all } = require('../routers/apiRouter.js');
const debug = require('debug')('ctrller:log');

module.exports = {
    async getOne(req, res) {
        id = req.params.id;
        const visitor = await dataMapper.findOne(id);
        if (!visitor) {
            throw new ApiError('Visitor not found', 404);
        }
        return res.json(visitor);
    },
    async getEvents(req, res){
        const openAttractions = await dataMapper.findAllOpen();
        const closedAttractions = await dataMapper.findAllClosed();
        let allAttractions = [];
        openAttractions.forEach((attraction)=>{
            attraction.availability = 'open';
            allAttractions.push(attraction);
        });
        closedAttractions.forEach((attraction)=>{
            attraction.availability = 'closed';
            allAttractions.push(attraction);
        });
        //debug(allAttractions);
        return res.json(allAttractions);
    },
    async getBookings(req, res){
        const id = req.params.id;
        const bookings = await dataMapper.findAllBookings(id);
        // debug(bookings);
        // debug(bookings[0].array_agg);
        return res.json(bookings[0].array_agg);
    }
};
