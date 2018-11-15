import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';

import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  MenuList,
  ListItem,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  getAuthenticatedUser,
  logOutUser,
  isAuthenticated,
} from '../../apollo/client';
import { MESSAGES_QUERY } from '../../apollo/queries';
import logo from '../../images/header-logo-msstate-libraries-white.png';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing.unit * 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    width: 300,
    marginRight: 30,
  },
  message: {
    width: 300,
    height: 'auto',
    fontSize: '0.8rem',
    whiteSpace: 'normal',
  },
});

class MenuBar extends Component {
  state = {
    anchorEl: null,
    openEl: null,
  };

  handleLogOut = () => {
    logOutUser();
    window.location.href = '/';
  };

  handleMenu = openEl => event => {
    this.setState({ anchorEl: event.currentTarget, openEl });
  };

  handleMessagesList = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, openEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, openEl } = this.state;
    const open = Boolean(anchorEl);
    const user = getAuthenticatedUser();

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <img
              className={classes.logo}
              src={logo}
              alt="Mississippi State University Libraries"
            />
          </Link>
          {/* <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Thesis & Dissertation
          </Typography>

          {isAuthenticated() && (
            <>
              <Query
                query={MESSAGES_QUERY}
                variables={{ recipientId: user.id }}
              >
                {({ data }) => {
                  // console.log(user.id);
                  let newMessageCount = 0;
                  if (data && data.messages) {
                    const newMessages = data.messages.filter(msg => !msg.read);
                    newMessageCount = newMessages.length;
                    if (newMessageCount !== 0) {
                      return (
                        <>
                          <IconButton
                            aria-owns={openEl === 'messages'}
                            aria-haspopup="true"
                            onClick={this.handleMenu('messages')}
                            color="inherit"
                          >
                            <Badge badgeContent={newMessageCount} color="error">
                              <MailIcon />
                            </Badge>
                          </IconButton>
                          <Menu
                            id="messages-appbar"
                            anchorEl={anchorEl}
                            open={openEl === 'messages'}
                            onClose={this.handleClose}
                            className={classes.menu}
                          >
                            {newMessages.map(msg => (
                              <MenuItem
                                key={msg.id}
                                className={classes.message}
                                dense
                              >
                                {msg.content}
                              </MenuItem>
                            ))}
                          </Menu>
                        </>
                      );
                    }
                  }
                  return <MailIcon />;
                }}
              </Query>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu('user')}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={openEl === 'user'}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withRouter(withStyles(styles)(MenuBar));
