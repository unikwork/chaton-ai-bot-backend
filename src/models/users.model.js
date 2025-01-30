export default (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    UID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    socketID: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    total_token: {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return Users;
};
