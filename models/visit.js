'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('Visit', {
    location: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    synopsis: DataTypes.STRING
  }, {});
  Visit.associate = function(models) {
    // associations can be defined here
    Visit.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profileId',
        allowNull: false
      }
    });
  };
  return Visit;
};