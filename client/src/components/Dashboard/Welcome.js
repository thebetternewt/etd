import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Welcome = ({ classes }) => (
  <div>
    <Paper className={classes.paper}>
      <Typography variant="h3" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the Mississippi State University Electronic Thesis &
        Dissertation (ETD) workflow system. We are glad you’re here. Let’s get
        started!
      </Typography>
      <Link to="/submit">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          Get Started!
        </Button>
      </Link>
    </Paper>
  </div>
);

export default withStyles(styles)(Welcome);
