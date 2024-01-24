import { Sequelize, DataTypes } from "sequelize";

//Erstelle ein Objekt:
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite"
});

//Bau n Modell:
let cd = sequelize.define("cd", {
    title: {type: DataTypes.STRING},
    artist: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING},
    company: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT},
    year: {type: DataTypes.INTEGER}
});

//Raus damit
export default {
    sequelize,
    cd
}