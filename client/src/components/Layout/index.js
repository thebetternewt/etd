import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuBar from './MenuBar';
import SideDrawer from './SideDrawer';
import { isAuthenticated } from '../../apollo/client';

const drawerWidth = 280;

const styles = theme => ({
  content: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#eee',
    marginTop: '60px',
    padding: theme.spacing.unit * 3,
  },
});

const Layout = props => {
  const { classes, children } = props;
  return (
    <>
      <MenuBar />
      <>
        {isAuthenticated() ? (
          <SideDrawer width={drawerWidth} />
        ) : (
          <div style={{ width: drawerWidth }} />
        )}
        <main
          className={classes.content}
          style={{ marginLeft: isAuthenticated() ? drawerWidth : 0 }}
        >
          {children}
        </main>
      </>
    </>
  );
};

Layout.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withStyles(styles)(Layout);
