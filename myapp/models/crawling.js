'use strict';
module.exports = (sequelize, DataTypes) => {
  const crawling = sequelize.define('crawling', {
    movie_name:{
      type:DataTypes.STRING,
      allowNull : false,
    },
    movie_a:{
      type:DataTypes.STRING,
      allowNull : false,
    }
  }, {});
  crawling.associate = function(models) {
    // associations can be defined here
  };
  return crawling;
};