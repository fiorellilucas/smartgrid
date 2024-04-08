const { Sequelize } = require('sequelize')
require('dotenv').config()

URI_DATABASE = process.env.URI_DATABASE
console.log(URI_DATABASE)

const sequelize = new Sequelize(URI_DATABASE)

try {
    sequelize.authenticate()
    console.log("Conectado ao BD")
} catch (error) {
    console.error("Não foi possivel conectar ao BD", error)
}