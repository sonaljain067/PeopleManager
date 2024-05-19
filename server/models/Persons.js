module.exports = (sequelize, DataTypes) => {
    const Persons = sequelize.define("Persons", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false
        },
    })

    return Persons; 
}