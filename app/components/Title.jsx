import React from 'react'
import Divider from '@mui/material/Divider'
import PropTypes from 'prop-types'

function Title(props) {
  return (
    <div
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 35,
      }}
    >
      <h1>{props.text}</h1>
      <Divider />
    </div>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Title
