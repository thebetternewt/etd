import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
// import { logOutUser, isAuthenticated } from '../../apollo/client';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class MenuBar extends Component {
  // handleLogOut = () => {
  //   logOutUser();
  //   window.location.href = '/';
  // };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            ETD
          </Typography>

          <Button variant="contained" onClick={this.handleLogOut}>
            Logout
            </Button>

        </Toolbar>
      </AppBar>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withRouter(withStyles(styles)(MenuBar));
