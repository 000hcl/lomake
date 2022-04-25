/**
 * Insert application wide common items here
 */

const { data } = require("./data")

const inProduction = process.env.NODE_ENV === 'production'

const basePath = process.env.BASE_PATH || '/'

const LOMAKE_SINCE_YEAR = 2019

const getYearsArray = since => {
  const years = []
  for (let i = new Date().getFullYear(); i >= since; i--) {
    const year = i
    years.push(year)
  }
  return years
}

const mapToDegreeCode = (organisationCode) => {
  if (!organisationCode) return ""
  if (organisationCode.length < 7) return ""
  const doctoral = organisationCode[0] === 'T'
  if (doctoral) {
    return organisationCode
  }

  const [start, end] = organisationCode.split('-')
  if (end && end.length < 3) return ""
  if (start.length < 2) return ""
  const masters = end[0] === 'M'
  const code = `${masters ? 'M' : 'K'}H${start.substr(0, 2)}_${end.substr(-3)}`
  return code
}

// admin- and superAdmin-rights are also defined as special groups
const specialGroups = [
  { group: 'allProgrammes', translationTag: 'accessAllProgrammes' },
  { group: 'international2020', translationTag: 'accessInternational2020' },
  { group: 'international', translationTag: 'accessInternational' },
  { group: 'doctoral', translationTag: 'accessDoctoral' },
  ...data.map(f => ({ group: f.code, translationTag: f.name, faculty: true })),
]

// First one is the current year, after that all the years that have answers
const defaultYears = getYearsArray(LOMAKE_SINCE_YEAR)

const degreeLevels = ['Bachelor´s level (1. cycle)', 'Master´s level (2. cycle)', 'Doctoral level (3. cycle)']

const requiredFormIds = [
  'faculty',
  'degree_level',
  'programme',
  'review_of_last_years_situation_report',
  'student_admissions_light',
  'student_admissions_text',
  'language_environment_light',
  'language_environment_text',
  'programme_identity_light',
  'programme_identity_text',
  'employability_light',
  'employability_text',
  'learning_outcomes_light',
  'learning_outcomes_text',
  'curriculum_light',
  'curriculum_text',
  'guidance_light',
  'guidance_text',
  'student_feedback_light',
  'student_feedback_text',
  'community_wellbeing_light',
  'community_wellbeing_text',
  'teacher_skills_light',
  'teacher_skills_text',
  'management_light',
  'management_text',
  'teaching_resources_light',
  'teaching_resources_text',
  'recruitment_influence_light',
  'recruitment_influence_text',
  'resourcing_light',
  'resourcing_text',
  'successes_and_development_needs_text',
  'measures_1_text',
]

const TEST_SUPERADMINS = ['admin', 'cypressSuperAdminUser', 'admini']

const hasSpecialGroup = (user, group) => {
  if (user.specialGroup) {
    const groups = Object.keys(user.specialGroup)
    return groups.includes(group)
  }
  return false
}

const isTestSuperAdminUid = uid => {
  return TEST_SUPERADMINS.includes(uid)
}

const isSuperAdmin = user => {
  return hasSpecialGroup(user, 'superAdmin')
}

const isAdmin = user => {
  return user.admin || hasSpecialGroup(user, 'admin')
}

const isBasicUser = user => {
  if (!user.admin && !hasSpecialGroup(user, 'superAdmin') && !hasSpecialGroup(user, 'admin')) return true
  return false
}

const isSpecialGroupUser = user => {
  if (user.specialGroup && Object.keys(user.specialGroup) && Object.keys(user.specialGroup).length > 0) return true
  return false
}

const isInternationalUser = user => {
  if (user.specialGroup && Object.keys(user.specialGroup) && user.specialGroup.international) return true
  return false
}

const internationalAccess = {
  MH50_004: { read: true, year: 2020 },
  MH50_010: { read: true, year: 2020 },
  MH40_005: { read: true, year: 2020 },
  MH57_001: { read: true, year: 2020 },
  MH80_004: { read: true, year: 2020 },
  MH50_002: { read: true, year: 2020 },
  MH40_003: { read: true, year: 2020 },
  MH40_011: { read: true, year: 2020 },
  MH70_006: { read: true, year: 2020 },
  MH57_003: { read: true, year: 2020 },
  MH50_011: { read: true, year: 2020 },
  MH70_003: { read: true, year: 2020 },
  MH80_005: { read: true, year: 2020 },
  MH50_006: { read: true, year: 2020 },
  MH20_002: { read: true, year: 2020 },
  MH57_002: { read: true, year: 2020 },
  MH50_013: { read: true, year: 2020 },
  MH50_007: { read: true, year: 2020 },
  MH50_012: { read: true, year: 2020 },
  MH80_002: { read: true, year: 2020 },
  MH80_001: { read: true, year: 2020 },
  MH50_001: { read: true, year: 2020 },
  MH50_005: { read: true, year: 2020 },
  MH80_003: { read: true, year: 2020 },
  MH80_007: { read: true, year: 2020 },
  MH57_004: { read: true, year: 2020 },
  MH70_005: { read: true, year: 2020 },
  MH70_009: { read: true, year: 2020 },
  MH50_003: { read: true, year: 2020 },
  MH50_009: { read: true, year: 2020 },
  MH30_002: { read: true, year: 2020 },
  MH40_004: { read: true, year: 2020 },
  MH57_005: { read: true, year: 2020 },
  MH60_002: { read: true, year: 2020 },
  MH20_003: { read: true, year: 2020 },
}

const cypressUsers = [
  {
    uid: 'cypressUser',
    firstname: 'cyp',
    lastname: 'res',
    email: 'cypressUser',
    admin: false,
    access: {},
  },
  {
    uid: 'cypressUser2',
    firstname: 'cyp2',
    lastname: 'res2',
    email: 'cypressUser2',
    admin: false,
    access: {},
  },
  {
    uid: 'cypressUser3',
    firstname: 'cyp3',
    lastname: 'res3',
    email: 'cypress-user-3@helsinki.fi',
    admin: false,
    specialGroup: {},
    access: {
      KH50_004: { read: true, write: true },
      KH80_001: { read: true, write: true, admin: true },
      KH50_003: { read: true },
    },
  },
  {
    uid: 'cypressInternationalUser',
    firstname: 'cyp4',
    lastname: 'res4',
    email: 'cypress-international-user@helsinki.fi',
    admin: false,
    specialGroup: { international2020: true },
    access: internationalAccess,
  },
  {
    uid: 'cypressAdminUser',
    firstname: 'cypress',
    lastname: 'admin',
    email: 'cypressAdminUser',
    admin: true,
  },
]

const testProgrammeName = 'TOSKA101'

module.exports = {
  inProduction,
  basePath,
  defaultYears,
  degreeLevels,
  specialGroups,
  requiredFormIds,
  isSuperAdmin,
  isTestSuperAdminUid,
  isAdmin,
  isBasicUser,
  isSpecialGroupUser,
  isInternationalUser,
  cypressUsers,
  testProgrammeName,
  LOMAKE_SINCE_YEAR,
  getYearsArray,
  mapToDegreeCode
}
