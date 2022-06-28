import gql from "graphql-tag";

export const Login = gql`
  mutation phoneAndEmailLogin($input: PhoneAndEmailLoginInput!) {
    phoneAndEmailLogin(input: $input) {
      data {
        id
        verifiedPhone
        profilePicture
        token
      }
      success
      code
      message
    }
  }
`;
