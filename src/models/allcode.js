'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ALLCODES extends Model {
        static associate(models) {
            ALLCODES.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            ALLCODES.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
        }
    };
    ALLCODES.init({
        type: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ALLCODES',
    });
    return ALLCODES;
};