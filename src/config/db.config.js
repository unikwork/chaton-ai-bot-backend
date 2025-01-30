import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
    underscored: true,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import Users from "../models/users.model.js";
db.Users = Users(sequelize, Sequelize);
import Category from "../models/category.model.js";
db.Category = Category(sequelize, Sequelize);
import Chats from "../models/chat.model.js";
db.Chats = Chats(sequelize, Sequelize);

db.Users.hasMany(db.Chats, { foreignKey: "user_id" });
db.Chats.belongsTo(db.Users, { foreignKey: "user_id" });

db.Category.hasMany(db.Chats, { foreignKey: "category_id" });
db.Chats.belongsTo(db.Category, { foreignKey: "category_id" });

db.sequelize.sync({ alter: true }).then(async () => {
    if(await db.Category.count() == 0){
        await db.Category.bulkCreate([
          {
            name: "Popular",
            propmt_message: "Tell me about the latest trending ${message}.",
          },
          {
            name: "Social Media",
            propmt_message: "Write a viral tweet about ${message}.",
          },
          {
            name: "Education ",
            propmt_message:
              "Explain ${message} in a simple and easy-to-understand way.",
          },
          {
            name: "Communication",
            propmt_message:
              "Help me craft a polite and professional message for ${message}.",
          },
          {
            name: "Work",
            propmt_message: "Suggest some ways to improve ${message}.",
          },
          {
            name: "Traveling",
            propmt_message: "Give me a travel itinerary for ${message}.",
          },
          {
            name: "Emails",
            propmt_message: "Write a professional email for ${message}.",
          },
          {
            name: "Marketing",
            propmt_message: "Suggest creative content ideas for ${message}.",
          },
          {
            name: "Fun",
            propmt_message: "Tell me a funny about ${message}.",
          },
          {
            name: "Ideas",
            propmt_message: "Suggest unique content ideas for ${message}.",
          },
          {
            name: "Health",
            propmt_message: "How can I improve ${message}.",
          },
          {
            name: "Coding",
            propmt_message: "Generate a step-by-step guide to ${message}.",
          },
          {
            name: "Gaming",
            propmt_message: "Give me pro tips fo ${message}.",
          },
        ]);
    }
  console.log("Database Synced!");
});

export default db;
