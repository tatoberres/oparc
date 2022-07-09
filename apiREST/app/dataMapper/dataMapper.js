const client = require('../config/db');
const { ApiError } = require('../errors/errorHandler');
const debug = require('debug')('SQL:log');

module.exports = {

    async findOne(id) {
        const result = await client.query('SELECT * FROM visitor WHERE id = $1', [id]);
        //debug(result.rows);
        return result.rows;
    },
    async findAllOpen(){
        const result = await client.query(`
            SELECT * FROM attraction 
            WHERE id <> ALL (
                SELECT attraction_id FROM closed_attraction
            );
        `);
        //debug(result.rows);
        return result.rows;
    },
    async findAllClosed(){
        const result = await client.query(`
            SELECT * FROM attraction 
            WHERE id = ANY (
                SELECT attraction_id FROM closed_attraction
            );
        `);
        //debug(result.rows);
        return result.rows;
    },
    async findAllBookings(id){
        const result = await client.query(`
            SELECT * FROM visitor_reservation_not_passed
            WHERE visitor_id=$1
        `, [id]);
        debug(result.rows);
        return result.rows
    }

};
