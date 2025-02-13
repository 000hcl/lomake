const { AUTOMATIC_IAM_PERMISSIONS_ENABLED } = require('@util/common')
const { getIAMRights } = require('@util/IAMrights')
const logger = require('@util/logger')

const IAMmiddleware = async (req, _, next) => {
  if (req.path.includes('socket.io')) return next()
  if (req.path.includes('/cypress/')) return next()

  const { user } = req
  const { headers } = req

  if (req.path.includes('login') && AUTOMATIC_IAM_PERMISSIONS_ENABLED) {
    const { access, specialGroup, iamGroups } = getIAMRights(headers?.hygroupcn)
    logger.info({ message: `${user?.uid}: ${headers?.hygroupcn}` })
    user.access = access
    user.specialGroup = specialGroup
    user.iamGroups = iamGroups

    await user.save()
  }

  return next()
}

module.exports = IAMmiddleware
