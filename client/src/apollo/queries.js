import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    # @TODO: Create a fragment to query the following fields for an item:
    #
    id
    title
    imageurl
    description
    itemowner {
      id
      fullname
      email
      bio
    }
    tags {
      id
      title
    }
    created
    borrower {
      id
      fullname
      email
      bio
    }
    #
    # See the Apollo docs for instructions on how to use fragments:
    # https://www.apollographql.com/docs/angular/features/fragments.html
  }
`;
export const ITEM_QUERY = gql`
  query getItems($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
    # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query GetUserItems($id: ID!) {
    user(id: $id) {
      bio
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
    # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
    # Use the ItemFields fragment for the items and borrowed fields.
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!, $image: Upload!) {
    # @TODO: Pass the item and image into the addItem mutation as arguments
    # and return the new item id when the mutation is complete.
    addItem(item: $item, image: $image)
  }
`;

/**
 * Auth-related queries and mutations.
 */

// export const VIEWER_QUERY = gql`
//   query {
//     # @TODO: Query the id, email, fullname, and bio fields for the viewer.
//   }
// `
// export const LOGOUT_MUTATION = gql`
//   mutation {
//     # @TODO: Run the logout mutation.
//   }
// `

export const SIGNUP_MUTATION = gql`
  mutation($user: SignUpInput!) {
    signup(user: $user)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation($user: LoginInput!) {
    login(user: $user)
  }
`;
