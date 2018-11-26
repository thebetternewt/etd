import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/* eslint-disable */
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
/* eslint-enable */

const styles = theme => ({
  list: {
    width: 400,
    maxWidth: '100%',
    padding: 0,
    marginBottom: '2rem',
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: 10,
    boxShadow: theme.shadows[4],
    borderRadius: 4,
  },
  chip: {
    marginLeft: theme.spacing.unit,
    color: '#ffffff',
  },
});

const SubmissionReviewList = ({
  classes,
  reviews,
  selectedReview,
  selectReview,
}) => {
  const reviewListItems = reviews.map(review => (
    <ListItem
      key={review.id}
      className={classes.listItem}
      onClick={() => {
        selectReview(review);
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

SubmissionReviewList.defaultProps = {
  selectedReview: null,
};

SubmissionReviewList.propTypes = {
  classes: PropTypes.shape().isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedReview: PropTypes.shape(),
  selectReview: PropTypes.func.isRequired,
};

export default withStyles(styles)(SubmissionReviewList);
