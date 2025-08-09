module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Tasks, {
      foreignKey: "UserEmail", // <-- Match this to Tasks model foreignKey
      sourceKey: "email",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return Users;
};
