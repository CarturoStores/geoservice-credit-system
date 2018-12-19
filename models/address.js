'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    token: DataTypes.STRING,
    street_number: DataTypes.INTEGER,
    state: DataTypes.STRING,
    zip_code: DataTypes.INTEGER
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    Address.belongsTo(models.Visit, {
      as: "Visit",
      foreignKey: {
        name: 'visitId',
        allowNull: false
      }
    });

    Address.belongsTo(models.Appointment, {
      as: "Appointment",
      foreignKey: {
        name: 'appointmentId',
        allowNull: false
      }
    });
  };
  return Address;
};