import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import { CURRENT_USER_QUERY } from '../../apollo/queries';

import { userItems, adminItems } from './SideDrawerItems';

const drawerWidth = 280;

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: drawerWidth,
    backgroundColor: '#fff',
  },
  toolbar: theme.mixins.toolbar,
  subheader: {
    textTransform: 'uppercase',
  },
});

const SideDrawer = props => {
  const { classes, match } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List
        component="nav"
        subheader={
          <Query query={CURRENT_USER_QUERY}>
            {({ data }) => {
              let subheaderText = 'User';
              if (data && data.me) {
                const { firstName, lastName } = data.me;
                subheaderText = `${firstName} ${lastName}`;
              }

              return (
                <ListSubheader component="div" className={classes.subheader}>
                  {subheaderText}
                </ListSubheader>
              );
            }}
          </Query>
        }
      >
        {userItems(match.url)}
      </List>
      <Query query={CURRENT_USER_QUERY}>
        {({ data }) => {
          if (data && data.me && data.me.admin) {
            return (
              <Fragment>
                <Divider />
                <List
                  component="nav"
                  subheader={
                    <ListSubheader
                      component="div"
                      className={classes.subheader}
                    >
                      Admin
                    </ListSubheader>
                  }
                >
                  {adminItems(match.url)}
                </List>
              </Fragment>
            );
          }

          return null;
        }}
      </Query>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default withRouter(withStyles(styles)(SideDrawer));
