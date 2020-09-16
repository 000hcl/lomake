import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { colors } from 'Utilities/common'

const translations = {
  expandText: {
    fi: 'Näytä viime vuoden vastaukset',
    en: 'Show answers from last year',
    se: 'Visa fjolårets svar',
  },
  collapseText: {
    fi: 'Piilota viime vuoden vastaukset',
    en: 'Hide answers from last year',
    se: 'Dölj fjolårets svar',
  },
}

const LastYearsAnswersAccordion = ({ children }) => {
  const [expanded, setExpanded] = useState(false)
  const languageCode = useSelector((state) => state.language)
  const viewingOldAnswers = useSelector((state) => state.form.viewingOldAnswers)

  // When viewing old answers, theres really no need to show even "older" answers.
  if (viewingOldAnswers) return null

  return (
    <div className="hide-in-print-mode">
      {expanded && <blockquote>{children}</blockquote>}
      <span
        style={{
          cursor: 'pointer',
          color: colors.blue,
          float: 'right',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? translations.collapseText[languageCode] : translations.expandText[languageCode]}
      </span>
    </div>
  )
}

export default LastYearsAnswersAccordion
