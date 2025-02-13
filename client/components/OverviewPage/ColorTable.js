import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Input } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { isAdmin } from '@root/config/common'
import { answersByYear, sortedItems } from 'Utilities/common'
import { getProgrammeOwners } from 'Utilities/redux/studyProgrammesReducer'
import { getAllTempAnswersAction } from 'Utilities/redux/tempAnswersReducer'
import questions from '../../questions.json'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import SummaryRow from './SummaryRow'
import './OverviewPage.scss'

const ColorTable = React.memo(
  ({
    setModalData,
    filteredProgrammes,
    setProgramControlsToShow,
    setStatsToShow,
    isBeingFiltered,
    filterValue,
    handleFilterChange,
  }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const draftYear = useSelector(state => state.deadlines.draftYear)
    const answers = useSelector(state => state.tempAnswers)
    const oldAnswers = useSelector(state => state.oldAnswers)
    const lang = useSelector(state => state.language)
    const currentUser = useSelector(({ currentUser }) => currentUser.data)
    const programmeOwners = useSelector(state => state.studyProgrammes.programmeOwners)
    const year = useSelector(({ filters }) => filters.year)
    const [reverse, setReverse] = useState(false)
    const [sorter, setSorter] = useState('name')

    useEffect(() => {
      dispatch(getAllTempAnswersAction())
      if (isAdmin(currentUser)) dispatch(getProgrammeOwners())
    }, [])

    const selectedAnswers = answersByYear({
      year,
      tempAnswers: answers,
      oldAnswers,
      draftYear: draftYear && draftYear.year,
    })

    const sortedProgrammes = sortedItems(filteredProgrammes, sorter, lang)

    if (reverse) sortedProgrammes.reverse()

    const sort = sortValue => {
      setSorter(sortValue)
      setReverse(!reverse)
    }

    const stats = useMemo(() => {
      if (!selectedAnswers) return {}

      return sortedProgrammes.reduce((statObject, { key }) => {
        const programme = selectedAnswers.find(a => a.programme === key)
        const answers = programme && programme.data ? programme.data : {}

        Object.keys(answers).forEach(answerKey => {
          if (answerKey.includes('_light')) {
            const color = answers[answerKey] // "red", "yellow", "green" or ""
            const baseKey = answerKey.replace('_light', '')
            if (!statObject[baseKey]) statObject[baseKey] = {}

            statObject[baseKey][color] = statObject[baseKey][color] ? statObject[baseKey][color] + 1 : 1
          }
        })
        return statObject
      }, {})
    }, [sortedProgrammes, selectedAnswers, answers, isBeingFiltered, draftYear])

    if (answers.pending || !answers.data || !oldAnswers.data || (isAdmin(currentUser) && !programmeOwners))
      return <Loader active inline="centered" />

    const tableIds = questions.reduce((acc, cur) => {
      const questionObjects = cur.parts.reduce((acc, cur) => {
        if (cur.id.includes('information_needed') || cur.id.includes('information_used') || cur.type === 'TITLE') {
          return acc
        }
        return [
          ...acc,
          { id: cur.id, shortLabel: cur.shortLabel[lang], type: cur.no_color ? 'ENTITY_NOLIGHT' : cur.type },
        ]
      }, [])

      return [...acc, ...questionObjects]
    }, [])

    return (
      <div className="overview-color-grid">
        <TableHeader sort={sort} tableIds={tableIds} />
        <div className="table-container">
          <Input
            data-cy="overviewpage-filter"
            icon="filter"
            size="small"
            placeholder={t('programmeFilter')}
            onChange={handleFilterChange}
            value={filterValue}
          />
        </div>
        <div />
        <SummaryRow
          setStatsToShow={setStatsToShow}
          stats={stats}
          selectedAnswers={selectedAnswers}
          tableIds={tableIds}
        />
        <div className="sticky-header" />
        {sortedProgrammes.map(p => {
          return (
            <TableRow
              p={p}
              selectedAnswers={selectedAnswers}
              tableIds={tableIds}
              setModalData={setModalData}
              setProgramControlsToShow={setProgramControlsToShow}
              key={p.key}
            />
          )
        })}
      </div>
    )
  }
)

export default ColorTable
