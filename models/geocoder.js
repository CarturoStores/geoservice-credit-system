'use strict';
module.exports = (sequelize, DataTypes) => {
  const Geocoder = sequelize.define('Geocoder', {
    address: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    state: DataTypes.STRING,
    street_number: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  Geocoder.associate = function(models) {
    // associations can be defined here
  };
  return Geocoder;
};