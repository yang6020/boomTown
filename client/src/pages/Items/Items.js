import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import Header from './Header.js';

import styles from './styles'

const Items = ({ classes }) => {
  return (
    <div>
      <Header> </Header>
      <p>
        This is the items page located at <code>/items</code>.
      </p>
    </div>
  )
}

export default withStyles(styles)(Items)
