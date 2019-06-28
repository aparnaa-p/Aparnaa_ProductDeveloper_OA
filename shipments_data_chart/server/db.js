const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const forShipmentsData = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
      shipmentsData(
        shipment_id INT PRIMARY KEY,
        source_id INT NOT NULL,
        destination_id INT NOT NULL,
        date DATE NOT NULL,
        weight INT NOT NULL,
        cost INT NOT NULL,
        new_shipment_id INT NOT NULL,
        new_weight INT NOT NULL,
        new_cost INT NOT NULL,
        total_tls INT NOT NULL
      )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const forVizConfig = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
      vizConfig(
        name VARCHAR(128) PRIMARY KEY,
        table_name VARCHAR(128) NOT NULL,
        master_circle INT NOT NULL,
        parent_circle INT NOT NULL,
        children_circle DATE NOT NULL,
        parent_size INT NOT NULL,
        children_size INT NOT NULL,
        parent_tooltip INT NOT NULL,
        children_tooltip INT NOT NULL
      )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

module.exports = {
    forShipmentsData,
    forVizConfig
};