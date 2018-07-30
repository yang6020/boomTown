import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import React from 'react';
// -------------------------------

import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries';
import { ViewerContext } from '../context/ViewerProvider';

const itemsData = ({ render }) => {
  return (
    <ViewerContext.Consumer>
      {({ loading, viewer, error }) => {
        return (
          <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
            {({ data: { items } = {}, loading, error }) =>
              render({ items, loading, error })
            }
          </Query>
        );
      }}
    </ViewerContext.Consumer>
  );
};

/**
 * @TODO: Use Apollo's <Query /> component to fetch all the items.
 *
 * Note: Your query will need to filter out borrowed items.
 *
 * The final query will ultimately filter out items that belong to the
 * currently logged-in user once you have added authentication.
 */

const userItemsData = ({ id, render }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => {
      return (
        <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: id || viewer.id }}>
          {({ data: { users } = {}, loading }) => render({ users, loading })}
        </Query>
      );
    }}
  </ViewerContext.Consumer>
  /**
   * @TODO: Use Apollo's <Query /> component to fetch all of a user's items.
   *
   * Note: Your query will need to retrieve only items that belong to a
   * specific user id.
   */
);

const tagData = ({ render }) => {
  /**
   * @TODO: Use Apollo's <Query /> component to fetch all the tags.
   */

  return (
    <Query query={ALL_TAGS_QUERY}>
      {({ data: { tags }, loading, error }) => render({ tags, loading, error })}
    </Query>
  );
};
const addItem = ({ render }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Mutation
        mutation={ADD_ITEM_MUTATION}
        refetchQueries={() => [
          { query: ALL_USER_ITEMS_QUERY, variables: { id: viewer.id } }
        ]}
      >
        {(mutation, { data, error, loading }) =>
          render({ mutation, data, error, loading })
        }
      </Mutation>
    )}
  </ViewerContext.Consumer>
);
const ItemsContainer = adopt({
  // @TODO: Uncomment each line as you write the corresponding query.

  tagData,
  itemsData,
  userItemsData,
  addItem
  // -------------------------------
});

export default ItemsContainer;
