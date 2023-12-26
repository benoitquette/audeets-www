import React, { useEffect } from 'react'
import Canvas from '@components/Canvas'
import { withRouter } from 'react-router-dom'
import AuditCategory from './AuditCategory'
import AuditToolbar from './AuditToolbar'
import _ from 'lodash'
import { fetchAudit, setFilterUrl, setShowFailsOnly } from './actions'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

function Audit(props) {
  const dispatch = useDispatch()
  const { list, urls, filterUrl, showFailsOnly } = useSelector(state => state.audit)
  const { drawerOpen } = useSelector(state => state.console)
  const projectId = props.match.params.projectId
  const date = props.match.params.date

  useEffect(() => {
    dispatch(fetchAudit(projectId, date))
  }, [date, dispatch, projectId])

  const toolbar = (
    <AuditToolbar
      urls={urls}
      urlFilterSelected={(url) => {
        dispatch(setFilterUrl(url))
      }}
      selectedUrl={filterUrl}
      setShowFailsOnly={(checked) => {
        dispatch(setShowFailsOnly(checked))
      }}
      showFailsOnly={showFailsOnly}
      navigateToProject={() => {
        props.history.push(`/console/${projectId}`)
      }}
    />
  )

  return (
    <Canvas toolbar={toolbar} drawerOpen={drawerOpen}>
      {_.chain(list)
        .filter((result) => {
          return result.url === filterUrl
        })
        .sortBy((result) => {
          return result.category + result.rule
        })
        .groupBy((result) => {
          return result.category
        })
        .map((results) => {
          const categoryName = results[0].category
          return (
            <AuditCategory
              key={categoryName}
              categoryName={categoryName}
              results={results}
              showFailsOnly={showFailsOnly}
            />
          )
        })
        .value()}
    </Canvas>
  )
}

Audit.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withRouter(Audit)
