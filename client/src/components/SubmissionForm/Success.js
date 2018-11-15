import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  form: {
    width: 300,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
  },
  formButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  list: {
    width: 300,
  },
});

const Success = () => (
  <>
    <Typography variant="h5" align="center">
      Thank you for your submission!
    </Typography>
    <Typography variant="body1" align="center">
      You will get an email with further instructions.
    </Typography>
  </>
);

export default withStyles(styles)(Success);
