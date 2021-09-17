const { Model, DataTypes } = require('sequelize');


class Process extends Model {

    static init(sequelize) {
        super.init({
            registerNumber: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            originLocation: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            location: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        
            sourceDocument: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        
            documentDescription: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        
            seiNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        
            receivedBy: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        
            answerDocument: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        
            contactInfo: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            sequelize
        });
    }
}

module.exports = Process;