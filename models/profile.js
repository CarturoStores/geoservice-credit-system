'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { max: 40 }
    },
    location: DataTypes.STRING,
    bio: DataTypes.STRING,
    social: {
      type: DataTypes.JSON
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted']
    },
    visited: {
      type: DataTypes.STRING
    },  
    appointmentlist: {
      type: DataTypes.STRING
    },
  }, {
    getterVisited() {
      return this.getDataValue('visited').split(';')
    },
    setterVisited(val) {
      this.setDataValue('visited',val.join(';'));
    },
    getterAppointmentList() {
      return this.getDataValue('appointmentlist').split(';')
    },
    setterAppointmentList(val) {
      this.setDataValue('appointmentlist',val.join(';'));
    },
  });
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      as: "User",
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  };
  return Profile;
};