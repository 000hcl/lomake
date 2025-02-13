module.exports = (sequelize, DataTypes) => {
  const tempAnswer = sequelize.define(
    'tempAnswer',
    {
      programme: DataTypes.STRING,
      data: DataTypes.JSONB,
      year: DataTypes.INTEGER,
    },
    {
      underscored: true,
      tableName: 'temp_answers',
    }
  )

  return tempAnswer
}
