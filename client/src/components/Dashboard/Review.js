import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 5,
  },
});

const Review = ({ classes, review }) => (
  <Paper className={classes.paper} elevation={4}>
    <Typography variant="h4">Review</Typography>
    {review ? (
      <>
        <Typography variant="body1">Review #{review.id}</Typography>
      </>
    ) : (
      <Typography variant="body1">
        Select a submission on the right to see review details here.
      </Typography>
    )}
  </Paper>
);

export default withStyles(styles)(Review);
