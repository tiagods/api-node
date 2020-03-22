'use strict';
module.exports = (sequelize, DataTypes) => {
  const clientes = sequelize.define('clientes', {
    id: {
      type:DataTypes.STRING,
      primaryKey:true,
      autoIncrement:true
    },
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING
  }, {
    timestamps:false
  });
  clientes.associate = function(models) {
    // associations can be defined here
  };
  return clientes;
};