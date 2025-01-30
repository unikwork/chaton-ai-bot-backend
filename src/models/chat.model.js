export default (sequelize, Sequelize) => {
  const Users = sequelize.define("chats", {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    category_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    ai_chat: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    token: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
  });
  return Users;
};
