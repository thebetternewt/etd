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
// const chipStyle = status => {
//   switch (status) {
//     case 'PENDING':
//       return {
//         color: '#000000',
//         backgroundColor: '#FDE152',
//       };
//     case 'ASSIGNED':
//       return {
//         color: '#ffffff',
//         backgroundColor: '#F78532',
//       };
//     case 'CHANGES_REQUIRED':
//       return { color: '#ffffff', backgroundColor: '#E11C1C' };
//     case 'APPROVED':
//       return { color: '#ffffff', backgroundColor: '#48C864' };
//     default:
//       return { color: '#ffffff', backgroundColor: '#660000' };
//   }
// };
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

const SubmissionDraftList = ({
  classes,
  selectedDraft,
  selectDraft,
  drafts,
}) => {
  const draftListItems = drafts.map(draft => (
    <ListItem
      key={draft.id}
      className={classes.listItem}
      onClick={() => {
        selectDraft(draft);
      }}
      button
      selected={selectedDraft && draft.id === selectedDraft.id}
    >
      <ListItemText
        primary={
          <Typography variant="subtitle1" noWrap>
            {draft.title}
          </Typography>
        }
        secondary={moment(draft.updatedAt, 'x').format('LLL')}
      />
      <Chip
        label="DRAFT"
        className={classes.chip}
        // style={chipStyle(review.status)}
        color="secondary"
      />
    </ListItem>
  ));

  return <List className={classes.list}>{draftListItems}</List>;
};

SubmissionDraftList.defaultProps = {
  selectedDraft: null,
};

SubmissionDraftList.propTypes = {
  classes: PropTypes.shape().isRequired,
  drafts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedDraft: PropTypes.shape(),
  selectDraft: PropTypes.func.isRequired,
};

export default withStyles(styles)(SubmissionDraftList);
