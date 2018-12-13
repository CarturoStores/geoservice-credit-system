'use strict';
module.exports = (sequelize, DataTypes) => {
  const Geocoder = sequelize.define('Geocoder', {
    address: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  Geocoder.associate = function(models) {
    // associations can be defined here
  };
  return Geocoder;
};