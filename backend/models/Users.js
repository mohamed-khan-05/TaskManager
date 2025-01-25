module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Tasks, {
      onDelete: "CASCADE",
    });
  };
  return Users;
};
