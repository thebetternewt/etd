import React from 'react';
import moment from 'moment';
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const chipStyle = status => {
  switch (status) {
  case 'PENDING':
    return {
      color: '#000000',
      backgroundColor: '#FDE152',
    };
  case 'ASSIGNED':
    return {
      color: '#ffffff',
      backgroundColor: '#F78532',
    };
  case 'CHANGES_REQUIRED':
    return { color: '#ffffff', backgroundColor: '#E11C1C' };
  case 'APPROVED':
    return { color: '#ffffff', backgroundColor: '#48C864' };
  default:
    return { color: '#ffffff', backgroundColor: '#660000' };
  }
};

const styles = theme => ({
  list: {
    width: 400,
    maxWidth: '100%',
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: 10,
    boxShadow: theme.shadows[4],
  },
  chip: {
    margin: theme.spacing.unit,
    color: '#ffffff',
  },
});

const SubmissionList = ({ reviews, classes, selectReview, selectedReview }) => {
  const reviewListItems = reviews.map(review => (
    <ListItem
      key={review.id}
      className={classes.listItem}
      onClick={() => {
        selectReview(review);
        console.log(review.id);
      }}
      button
      selected={selectedReview && review.id === selectedReview.id}
    >
      <ListItemText
        primary={
          <Typography variant="subtitle1" noWrap>
            {review.submissionTitle}
          </Typography>
        }
        secondary={moment(review.submittedOn, 'x').format('LLL')}
      />
      <Chip
        label={review.status}
        className={classes.chip}
        style={chipStyle(review.status)}
      />
    </ListItem>
  ));

  return <List className={classes.list}>{reviewListItems}</List>;
};

export default withStyles(styles)(SubmissionList);
