const db = require('@models/index')
const logger = require('@util/logger')
const { uuid } = require('uuidv4')
const { data, facultyMap } = require('@root/config/data')

const seed = async () => {
  logger.info("Seeding ...")
  await db.companionFaculty.destroy({ where: {} })
  await db.studyprogramme.destroy({ where: {} })
  await db.faculty.destroy({ where: {} })
  await db.token.destroy({ where: {} })

  /**
   * Create faculties
   */
  for (const { code, name } of data) {
    await db.faculty.create({
      code,
      name,
    })
  }

  /**
   * Create studyprogrammes
   */
  for (const { code, programmes } of data) {
    const primaryFaculty = await db.faculty.findOne({ where: { code } })

    for (const { key, name } of programmes) {
      await db.studyprogramme.create({
        key,
        name,
        locked: false,
        claimed: false,
        primaryFacultyId: primaryFaculty.id,
      })
    }
  }

  /**
   * Create companionFaculties "kumppanuusohjelma"
   */

  for (const { code, programmes } of data) {
    for (const { key, name, companionFaculties } of programmes) {
      for (const faculty of companionFaculties) {
        const facultyCode = facultyMap[faculty]

        const facultyId = (
          await db.faculty.findOne({
            where: {
              code: facultyCode,
            },
          })
        ).id

        const studyprogrammeId = (
          await db.studyprogramme.findOne({
            where: {
              key: key,
            },
          })
        ).id

        await db.companionFaculty.create({
          facultyId: facultyId,
          studyprogrammeId: studyprogrammeId,
        })
      }
    }
  }

  /**
   * Create tokens
   */

  const studyprogrammes = await db.studyprogramme.findAll()
  for (const { key } of studyprogrammes) {
    await db.token.create({
      url: uuid(),
      programme: key,
      type: 'ADMIN',
      valid: true,
      usageCounter: 0,
    })
    await db.token.create({
      url: uuid(),
      programme: key,
      type: 'READ',
      valid: true,
      usageCounter: 0,
    })
    await db.token.create({
      url: uuid(),
      programme: key,
      type: 'WRITE',
      valid: true,
      usageCounter: 0,
    })
  }

  // Create tokens for faculty wide read-links:
  const faculties = await db.faculty.findAll()
  for (const faculty of faculties) {
    await db.token.create({
      url: uuid(),
      faculty: faculty.code,
      type: 'READ',
      valid: true,
      usageCounter: 0,
    })
    await db.token.create({
      url: uuid(),
      faculty: faculty.code,
      type: 'READ_DOCTOR',
      valid: true,
      usageCounter: 0,
    })
  }

  logger.info('Seeding completed')
}
module.exports = {
  seed,
}
