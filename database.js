const mysql = require("mysql");

const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Th4n4p4t$",
    connectionLimit: 10
})

dbConnection.query(`INSERT INTO WebFertilizer.users (card_id, password) VALUES ('1102800113194', '123456')`)
dbConnection.query(`SELECT * FROM WebFertilizer.users`, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});



module.exports = dbConnection;

