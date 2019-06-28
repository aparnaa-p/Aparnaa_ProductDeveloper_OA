var db = require('../../db');
const format = require('pg-format');

const shipmentsData = {

    async createMultiple(req, res) {
        const values = req.body.values;
        const text = format('INSERT INTO shipmentsData (shipment_id, source_id, destination_id, date, weight, cost, new_shipment_id, new_weight, new_cost, total_tls) VALUES %L returning id', values);
        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },

    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM shipmentsData';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({ rows, rowCount });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

module.exports=shipmentsData;