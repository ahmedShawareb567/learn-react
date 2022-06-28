import gql from "graphql-tag";

export const Me = gql`
  query me {
    me {
      data {
        id
        token
        verifiedPhone
        profilePicture
      }
    }
  }
`;
