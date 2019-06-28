var db = require('../../db');

const vizConfig = {

    async createOne(req, res) {
        const text = `INSERT INTO
      vizConfig(name, table, master_circle, parent_circle, children_circle, parent_size, children_size, parent_tooltip, children_tooltip)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
        const values = [
            req.body.name,
            req.body.table,
            req.body.master_circle,
            req.body.parent_circle,
            req.body.children_circle,
            req.body.parent_size,
            req.body.children_size,
            req.body.parent_tooltip,
            req.body.children_tooltip
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },

    async getOne(req, res) {
        const text = 'SELECT * FROM vizConfig WHERE name = $1';
        try {
            const { rows } = await db.query(text, [req.params.name]);
            return res.status(200).send({ rows });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

module.exports = vizConfig;