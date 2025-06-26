const mysql = require("mysql")

require("dotenv").config()

class Database {

    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: "chess"
        })
        this.connecting = false
    }

    connect() {

        if (this.connecting) return

        this.connection.connect(error => {
            if (error) {
                throw error
            }

            console.log("conectado :)");
        })

        this.connecting = true
    }

    async select() {

        const query = `SELECT * FROM games;`

        try {

            return new Promise((resolve, reject) => {
                this.connection.query(query, (err, res, fields) => {
                    if (err) throw reject(err)

                    // console.log(res);
                    resolve(res)
                })
            })

        } catch (e) {
            throw e
        }

    }

    async insert(game) {
        const query = `insert into games (notation, moves, game, result, gametime) values ('${game.notation}', '${game.moves}', '${game.game}', '${game.result}', '${game.gametime}');`

        console.log(query);
        

        try {

            return new Promise((resolve, reject) => {
                this.connection.query(query, (err, res, fields) => {
                    if (err) throw reject(err)

                    // console.log(res);
                    resolve(res)
                })
            })

        } catch (e) {
            throw e
        }
    }

    async close() {
        if (this.connection) {
            await this.connection.end()
        }
    }

}


module.exports = Database
