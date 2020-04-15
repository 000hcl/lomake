import { combineReducers } from 'redux'

import form from './formReducer'
import room from './roomReducer'
import currentUser from './currentUserReducer'
import users from './usersReducer'
import tempAnswers from './tempAnswersReducer'
import currentAnswers from './currentAnswersReducer'
import language from './languageReducer'
import accessToken from './accessTokenReducer'
import previousAnswers from './previousAnswersReducer'
import programmesTokens from './programmesTokensReducer'
import programmesUsers from './programmesUsersReducer'
import studyProgrammes from './studyProgrammesReducer'

export default combineReducers({
  form,
  room,
  currentUser,
  users,
  tempAnswers,
  currentAnswers,
  language,
  accessToken,
  previousAnswers,
  programmesTokens,
  programmesUsers,
  studyProgrammes,
})
