import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Loader } from 'semantic-ui-react'
import { getAnswersAction } from 'Utilities/redux/oldAnswersReducer'
import { getProgrammeOwners } from 'Utilities/redux/studyProgrammesReducer'
import { getAllTempAnswersAction } from 'Utilities/redux/tempAnswersReducer'
import questions from '../../questions.json'
import './SmileyTable.scss'
import SmileyTableCell from './SmileyTableCell'
import { PieChart } from 'react-minimal-pie-chart'

const translations = {
  openManageText: {
    fi: 'Hallitse',
    en: 'Manage',
    se: 'Administrera',
  },
  closeManageText: {
    fi: 'Piilota',
    en: 'Hide',
    se: 'Dölj',
  },
  noResultsText: {
    fi: 'Yhtään ohjelmaa ei löytynyt. Kokeile muuttaa hakua.',
    en: 'No matching programmes were found. Please try a different filter.',
    se: 'Inga program hittades. Prova att söka med andra kriterier.',
  },
  programmeClaimed: {
    fi: 'Tämä ohjelma on vastaanotettu',
    en: 'This programme has been claimed',
    se: '',
  },
  programmeNotClaimed: {
    fi: 'Tätä ohjelmaa ei ole vastaanotettu',
    en: 'This programme has not been claimed',
    se: '',
  },
}

const replaceTitle = {
  successes_and_development_needs: 'successes_and_needs',
  review_of_last_years_situation_report: 'review_of_last_year',
}

const SmileyTable = React.memo(
  ({
    setModalData,
    filteredProgrammes,
    year,
    setProgramControlsToShow,
    setStatsToShow,
    isBeingFiltered,
  }) => {
    const dispatch = useDispatch()
    const answers = useSelector((state) => state.tempAnswers)
    const oldAnswers = useSelector((state) => state.oldAnswers)
    const languageCode = useSelector((state) => state.language)
    const currentUser = useSelector(({ currentUser }) => currentUser.data)
    const programmeOwners = useSelector((state) => state.studyProgrammes.programmeOwners)

    useEffect(() => {
      dispatch(getAllTempAnswersAction())
      dispatch(getAnswersAction())
      if (currentUser.admin) dispatch(getProgrammeOwners())
    }, [])

    const transformIdToTitle = (id, vertical = true) => {
      const idToUse = replaceTitle[id] || id
      const formatted = idToUse.replace(/_/g, ' ')

      return (
        <span
          style={
            vertical
              ? {
                  writingMode: 'vertical-lr',
                }
              : {}
          }
        >
          {formatted.charAt(0).toUpperCase() + formatted.slice(1)}
        </span>
      )
    }

    if (
      answers.pending ||
      !answers.data ||
      !oldAnswers.data ||
      (currentUser.admin && !programmeOwners)
    )
      return <Loader active inline="centered" />

    const selectedAnswers =
      year === new Date().getFullYear()
        ? answers.data
        : oldAnswers.data.filter((a) => a.year === year)

    if (filteredProgrammes.length === 0)
      return (
        <Header as="h2" disabled>
          {translations.noResultsText[languageCode]}
        </Header>
      )

    let renderStatsRow = false
    const stats = isBeingFiltered
      ? {}
      : filteredProgrammes.reduce((statObject, { key }) => {
          const programme = selectedAnswers.find((a) => a.programme === key)
          const answers = programme && programme.data ? programme.data : {}

          Object.keys(answers).forEach((answerKey) => {
            if (answerKey.includes('_light')) {
              const light = answers[answerKey] // "red", "yellow", "green" or ""
              const baseKey = answerKey.replace('_light', '')
              if (!statObject[baseKey]) statObject[baseKey] = {}
              if (statObject[baseKey][light] === 4 && light !== '') {
                renderStatsRow = true
              }
              statObject[baseKey][light] = statObject[baseKey][light]
                ? statObject[baseKey][light] + 1
                : 1
            }
          })
          return statObject
        }, {})

    const hasManagementAccess = (program) => {
      if (currentUser.admin) return true
      return Object.entries(currentUser.access).find(
        (access) => access[0] === program && access[1].admin === true
      )
    }

    const ManageCell = ({ program }) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          data-cy={`${program.key}-manage`}
          icon="settings"
          circular
          onClick={() => setProgramControlsToShow(program)}
        />
      </div>
    )

    const ClaimedIcon = ({ programme }) => {
      if (!currentUser.admin) return null

      if (programme.claimed) {
        return (
          <Icon
            data-cy={`${programme.key}-claimed`}
            title={
              programmeOwners
                ? programmeOwners[programme.key]
                : translations['programmeClaimed'][languageCode]
            }
            name="thumbs up"
            size="large"
          />
        )
      }
      return (
        <Icon
          data-cy={`${programme.key}-notClaimed`}
          title={translations['programmeNotClaimed'][languageCode]}
          name="exclamation"
          size="large"
        />
      )
    }

    const tableIds = questions.reduce((acc, cur) => {
      const questionObjects = cur.parts.reduce((acc, cur) => {
        if (
          cur.id.includes('information_needed') ||
          cur.id.includes('information_used') ||
          cur.type === 'TITLE'
        ) {
          return acc
        }

        return [...acc, { id: cur.id, type: cur.no_light ? 'ENTITY_NOLIGHT' : cur.type }]
      }, [])

      return [...acc, ...questionObjects]
    }, [])

    return (
      <div className="smiley-grid">
        <div className="sticky-header" />
        {tableIds.map((idObject) => (
          <div
            key={idObject.id}
            className="sticky-header"
            style={{
              wordWrap: 'break-word',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {transformIdToTitle(idObject.id)}
          </div>
        ))}
        <div className="sticky-header" />
        <div className="sticky-header" />
        {renderStatsRow && (
          <>
            <div className="sticky-header" />
            {tableIds.map((idObject) =>
              stats.hasOwnProperty(idObject.id) ? (
                <div
                  key={idObject.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setStatsToShow({
                      stats: stats[idObject.id],
                      title: transformIdToTitle(idObject.id, false),
                      answers: selectedAnswers,
                      questionId: idObject.id,
                    })
                  }
                >
                  <PieChart
                    animationDuration={500}
                    animationEasing="ease-out"
                    center={[50, 50]}
                    data={[
                      {
                        color: '#9dff9d',
                        value: stats[idObject.id].green || 0,
                      },
                      {
                        color: '#ffffb1',
                        value: stats[idObject.id].yellow || 0,
                      },
                      {
                        color: '#ff7f7f',
                        value: stats[idObject.id].red || 0,
                      },
                    ]}
                    labelPosition={50}
                    lengthAngle={360}
                    lineWidth={100}
                    paddingAngle={0}
                    radius={50}
                    startAngle={0}
                    viewBoxSize={[100, 100]}
                  />
                </div>
              ) : (
                <div key={idObject.id} />
              )
            )}
            <div className="sticky-header" />
            <div className="sticky-header" />
          </>
        )}
        {filteredProgrammes.map((p) => {
          const programme = selectedAnswers.find((a) => a.programme === p.key)
          const targetURL = `/form/${p.key}`
          return (
            <React.Fragment key={p.key}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link data-cy={`smileytable-link-to-${p.key}`} to={targetURL}>
                  {p.name[languageCode] ? p.name[languageCode] : p.name['en']}
                </Link>
              </div>
              {tableIds.map((idObject) => (
                <SmileyTableCell
                  key={`${p.key}-${idObject.id}`}
                  programmesName={p.name[languageCode] ? p.name[languageCode] : p.name['en']}
                  programmesKey={p.key}
                  programmesAnswers={programme && programme.data ? programme.data : {}}
                  questionId={idObject.id}
                  questionType={idObject.type}
                  setModalData={setModalData}
                />
              ))}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ClaimedIcon programme={p} />
              </div>
              {hasManagementAccess(p.key) ? <ManageCell program={p} /> : <div />}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)

export default SmileyTable
