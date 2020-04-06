const db = require('@models/index')

const { isSuperAdmin } = require('@root/config/common')

const currentUser = async (req, res, next) => {
  let uid = req.headers.uid

  if (isSuperAdmin(uid)) {
    const loggedInAs = req.headers['x-admin-logged-in-as']
    if (loggedInAs) {
      uid = loggedInAs
      let fakeUser = await db.user.findOne({ where: { uid } }).then((res) => res.dataValues)
      req.user = fakeUser
    }
  }
  next()
}

module.exports = currentUser
