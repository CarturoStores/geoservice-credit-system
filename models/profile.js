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
      type: DataTypes.ENUM,
      values: ['visited', 'no visited', 'pending']
    },  
    appointmentlist: {
      type: DataTypes.ENUM,
      values: ['done', 'pending', 'cancel']
    },
  }, {});
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