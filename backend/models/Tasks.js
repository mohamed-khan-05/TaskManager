module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("Tasks", {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  Tasks.associate = (models) => {
    Tasks.belongsTo(models.Users, {
      foreignKey: "UserEmail",
      targetKey: "email",
      onDelete: "CASCADE",
    });
  };
  return Tasks;
};
