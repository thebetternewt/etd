import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Chip } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import HelpIcon from '@material-ui/icons/Help';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Query } from 'react-apollo';
import { UNASSIGNED_SUBMISSION_REVIEWS_QUERY } from '../../apollo/queries';

export const userItems = path => (
  <div>
    <Link to={`${path}`}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
  </div>
);

export const adminItems = path => (
  <div>
    <Link to={`${path}unassigned`}>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Unassigned" />
        <Query query={UNASSIGNED_SUBMISSION_REVIEWS_QUERY}>
          {({ loading, data }) => {
            if (!loading) {
              return (
                <Chip label={data.submissionReviews.length} color="secondary" />
              );
            }

            return null;
          }}
        </Query>
      </ListItem>
    </Link>
  </div>
);
