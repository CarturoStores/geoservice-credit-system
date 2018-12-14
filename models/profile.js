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
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    visited: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted']
    },
    appointmentlist: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted']
    },
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
  };
  return Profile;
};