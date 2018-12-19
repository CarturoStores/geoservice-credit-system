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
      type: DataTypes.JSON
    },  
    appointmentlist: {
      type: DataTypes.JSON
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

    Profile.hasMany(models.Visit, {
      foreignKey: {
        name: 'profileId',
        onDelete: 'CASCADE'
      }
    });

    Profile.hasMany(models.Appointment, {
      foreignKey: {
        name: 'profileId',
        onDelete: 'CASCADE'
      }
    });
  };
  return Profile;
};