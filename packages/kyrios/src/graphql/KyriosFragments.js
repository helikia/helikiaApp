import gql from 'graphql-tag';

export const userKyriosFragment = gql`
  fragment userKyriosFields on UserKyrios {
    _id
    firstname
    lastname
    email
  }
`;
