'use strict';
module.exports = (sequelize, DataTypes) => {
  const Geocoder = sequelize.define('Geocoder', {
    address: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    state: DataTypes.STRING,
    street_number: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  Geocoder.associate = function(models) {
    // associations can be defined here
  };
  return Geocoder;
};