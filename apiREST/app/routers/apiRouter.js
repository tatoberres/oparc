const { Router } = require('express');

const controller = require('../controllers/controller');
const validator = require('../validation/validator');
const middlewareWrapper = require('../middlewares/wrapper');

const router = Router();

/**
 * Object with all available and unavailable events
 * @typedef {object} visitor
 * @property {number} id visitor code
 * @property {string} firstname visitor firstname
 * @property {number} lastname visitor lasttname
 * @property {string} email visitor email
 * @property {string} phone_number visitor phone number
 * @property {string} being_date_validity visitor entrance starting date
 * @property {string} end_date_validity visitor entrance ending date
 */
/**
* GET /init/{id}
* @summary Get one visitor details
* @tags visitors
* @param {number} id.path.required - visitor identifier
* @return {visitor} 200 - success response - application/json
*/
router.get('/init/:id', middlewareWrapper(controller.getOne));

/**
 * Object with all available and unavailable events
 * @typedef {object} events
 * @property {number} id event code
 * @property {string} name event name
 * @property {number} capacity amount of reservations that can be made for a single event
 * @property {string} open_time everyday opening time
 * @property {string} duration event duration
 * @property {string} availability open or close event status
 */
/**
* GET /events/{id}
* @summary Get all open and closed events 
* @tags events
* @param {number} id.path.required - visitor identifier
* @return {events} 200 - success response - application/json
*/
router.get('/events/:id', controller.getEvents);

/**
 * Object with one or more available reservation for a customer
 * @typedef {object} reservation
 * @property {number} id reservation code
 * @property {number} companions number of companions
 * @property {string} reservation_time date and time for the reservation to be consumed
 * @property {number} visitor_id absolutely non necessary and redondant code for the visitor
 * @property {number} attraction_id attraction code identifier
 */
/**
* GET /bookings/{id}
* @summary Get all the reservations for a visitor
* @tags reservations
* @param {number} id.path.required - visitor identifier
* @return {[reservation]} 200 - success response - application/json
*/
router.get('/bookings/:id', controller.getBookings);

// router.put('/book', controller.putBook);

module.exports = router;

