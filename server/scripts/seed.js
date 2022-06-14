/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const db = require('@models/index')
const logger = require('@util/logger')
const { v4: uuid } = require('uuid')
const { data, facultyMap } = require('@root/config/data')

const seedFacultiesAndStudyprogrammes = async () => {
  await db.companionFaculty.destroy({ where: {} })
  await db.studyprogramme.destroy({ where: {} })
  await db.faculty.destroy({ where: {} })

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

    for (const { key, name, level, international } of programmes) {
      await db.studyprogramme.create({
        key,
        name,
        level,
        international,
        locked: false,
        claimed: false,
        primaryFacultyId: primaryFaculty.id,
      })
    }
  }

  /**
   * Create companionFaculties "kumppanuusohjelma"
   */

  for (const { programmes } of data) {
    for (const { key, companionFaculties } of programmes) {
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
              key,
            },
          })
        ).id

        await db.companionFaculty.create({
          facultyId,
          studyprogrammeId,
        })
      }
    }
  }
}

const seedTokens = async () => {
  await db.token.destroy({ where: {} })
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
}

const seed = async () => {
  logger.info('Seeding ...')
  const seedTokensAswell = process.argv[3] && process.argv[3].substr(2) === 'tokens'

  await seedFacultiesAndStudyprogrammes()

  // Sometimes we might want to seed faculties and studyprogrammes, but leave tokens untouched
  if (seedTokensAswell) {
    logger.info('Seeding tokens aswell')
    await seedTokens()
  }

  logger.info('Seeding completed')
}

module.exports = { seed }
