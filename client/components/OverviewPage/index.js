import React, { useState } from 'react'
import './OverviewPage.scss'
import { Modal, Header, Input } from 'semantic-ui-react'
import { programmes } from 'Utilities/common'
import SmileyTable from './SmileyTable'
import { useSelector } from 'react-redux'

export default () => {
  const [filter, setFilter] = useState('')
  const [modalData, setModalData] = useState(null)
  const languageCode = useSelector((state) => state.language)
  const currentUser = useSelector((state) => state.currentUser)

  const handleChange = ({ target }) => {
    const { value } = target
    setFilter(value)
  }

  const backgroundColorMap = {
    green: '#9dff9d',
    yellow: '#ffffb1',
    red: '#ff7f7f',
  }

  const translations = {
    noPermissions: {
      fi:
        'Sinulla ei ole oikeuksia millekkään koulutusohjelmalle. Ole hyvä ja ota yhteys Opetuksen Strategisiin Palveluihin tai koulutusohjelman johtajaan.',
      en:
        'You have no permissions for any programmes. Please contact The Strategic Services for Teaching or your programme leader.',
      se: '',
    },
    filter: {
      fi: 'Filtteröi',
      en: 'Filter',
      se: '',
    },
  }

  const usersProgrammes = currentUser.data.admin ? programmes : Object.keys(currentUser.data.access)

  const filteredProgrammes = usersProgrammes.filter((prog) => {
    return prog.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <>
      <Modal open={!!modalData} onClose={() => setModalData(null)} basic size="small" closeIcon>
        {/* Right now header is showing the question id but in the final version the full question is shown */}
        <Header icon="question" content={modalData ? modalData.content : ''} />
        <Modal.Content>
          <Modal.Description>{modalData ? modalData.programme : ''}</Modal.Description>
          <h3
            style={{
              color: backgroundColorMap[modalData ? modalData.color : 'green'],
            }}
          >
            {modalData ? modalData.header : ''}
          </h3>
        </Modal.Content>
      </Modal>

      {usersProgrammes.length > 0 ? (
        <>
          <Input
            data-cy="overviewpage-filter"
            name="filter"
            icon="filter"
            placeholder={translations.filter[languageCode]}
            onChange={handleChange}
            value={filter}
            size="huge"
          />
          <div style={{ marginTop: '2em' }}>
            <SmileyTable filteredProgrammes={filteredProgrammes} setModalData={setModalData} />
          </div>
        </>
      ) : (
        <Header style={{ textAlign: 'center', paddingTop: '5em' }} as="h2" disabled>
          {translations.noPermissions[languageCode]}
        </Header>
      )}
    </>
  )
}
