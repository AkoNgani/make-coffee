import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "completed", "canceled"),
        defaultValue: "pending",
    },
});

export default Order;
