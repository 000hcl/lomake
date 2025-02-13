import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Accordion, Grid, Icon, Popup } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { romanize } from 'Utilities/common'

const generateRandomKey = value => `${value}-${Math.random()}`

const Question = ({ answers, question, handleClick, showing }) => {
  const { t } = useTranslation()
  const [colors, setColors] = useState(['all', 'all', 'all'])
  const [buttons, setButtons] = useState([0, 0, 0])
  const multipleYears = useSelector(({ filters }) => filters.multipleYears)

  const filterColor = (yearsIndex, color, colorKey) => {
    const newColors = colors.map((c, index) =>
      index === yearsIndex && colors[yearsIndex] !== color ? color : colors[index]
    )
    const newButtons = buttons.map((b, index) =>
      index === yearsIndex && buttons[yearsIndex] !== colorKey ? colorKey : buttons[index]
    )
    setColors(newColors)
    setButtons(newButtons)
  }

  const ButtonPopup = ({ color, index, yearsIndex }) => (
    <Popup
      content={`${`${t('choose')} ${t('colors', { context: color })} ${t('answers')}`}`}
      trigger={
        <button
          key={color}
          name={color}
          type="button"
          className={`color-button-${buttons[yearsIndex] === index ? 'active' : ''}`}
          onClick={() => filterColor(yearsIndex, color, index)}
        >
          <span className={`answer-circle-big-${color}`} />
        </button>
      }
    />
  )

  const buttonColors = ['all', 'green', 'yellow', 'red']

  if (!answers) return <></>

  return (
    <>
      <Accordion.Title
        index={question.id}
        active={showing}
        data-cy={`comparison-question-${question.id}`}
        className={`question-header ${showing && 'sticky-header'}`}
        onClick={handleClick}
      >
        <Grid>
          <Grid.Column width={1} className="question-caret">
            <Icon name={`caret ${showing ? 'down' : 'right'}`} />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              <small className="question-title">
                {romanize(question.titleIndex)} - {question.title}
              </small>
            </span>
            <p className="question-label">
              {question.labelIndex}. {question.label.toUpperCase()}
            </p>
          </Grid.Column>
        </Grid>
      </Accordion.Title>
      <Accordion.Content active={showing}>
        <Grid>
          <Grid.Row columns={answers.length}>
            {answers.map(
              (year, yearsIndex) =>
                multipleYears.includes(year.year) && (
                  <Grid.Column key={generateRandomKey(year)} className="question-content">
                    <div className="comparison color-buttons noprint">
                      <label>{year.year}</label>
                      {buttonColors.map((color, index) => (
                        <ButtonPopup key={color} color={color} index={index} yearsIndex={yearsIndex} />
                      ))}
                    </div>
                    {year.answers.length > 0 ? (
                      year.answers.map(programme => {
                        if (colors[yearsIndex] === 'all' || programme.color === colors[yearsIndex]) {
                          return (
                            <div key={generateRandomKey(`${programme}-${year}`)}>
                              <label className="answer-title">
                                {programme.name} <span className={`answer-circle-${programme.color}`} />
                              </label>
                              <ul className="answer-list" data-cy={`compare-question-content-${question.id}`}>
                                {programme.answer &&
                                  programme.answer.split('\n').map(row => (
                                    <li key={generateRandomKey(programme)} className="answer-row">
                                      {row}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )
                        }
                        return null
                      })
                    ) : (
                      <h4>{t('noData')}</h4>
                    )}
                  </Grid.Column>
                )
            )}
          </Grid.Row>
        </Grid>
      </Accordion.Content>
    </>
  )
}

export default Question
