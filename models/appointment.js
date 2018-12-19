'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    location: DataTypes.STRING,
    date: DataTypes.STRING,
    synopsis: DataTypes.STRING
  }, {});
  Appointment.associate = function(models) {
    // associations can be defined here
    Appointment.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profileId',
        allowNull: false
      }
    });
  };
  return Appointment;
};