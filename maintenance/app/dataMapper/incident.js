const client = require('../config/db');
const debug = require('debug')('SQL:log');

module.exports = {

    async readAll () {
        const result = await client.query('SELECT * FROM incident ORDER BY end_time_resolution DESC;');
        debug(result);
        return result.rows;
    },

    async readOne (id) {
        const result = await client.query('SELECT * FROM incident WHERE id = $1;', [id]);
        debug(result.rows[0]);
        return result.rows[0];
    },

    async update (id, body) {
        const endTime = await client.query('SELECT end_time_resolution FROM incident WHERE id = $1;', [id]);
        if (body.end_time_resolution === '') body.end_time_resolution = endTime.rows[0].end_time_resolution;
        const fields = Object.keys(body).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(body);

        const updated = await client.query(
            `UPDATE incident SET ${fields} WHERE id = $${fields.length + 1} RETURNING *;`, 
            [...values, id]
        );
        debug(updated.rows[0]);
        return updated.rows[0];
    },
    async insertIncident(incident) {
        const savedincident = await client.query(
            `
                INSERT INTO incident
                (description, operator_name,attraction_id) 
                VALUES
                ($1, $2,$3) RETURNING *
            `,
            [incident.description, incident.operator_name,
                incident.attraction_id],
        );

        return savedincident.rows[0];
    },

};