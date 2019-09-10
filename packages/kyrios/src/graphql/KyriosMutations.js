/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const UPSERT_USER_KYRIOS = gql`

mutation($firstname: String!, $lastname: String!, $email: String!, $password: String!, $creationDate: String!, $role: String!) {
  upsertUserKyrios(firstname: $firstname, lastname: $lastname, email: $email, password: $password, creationDate: $creationDate, role: $role){
    firstname
    lastname
    email
    password
    creationDate
  }
}
`;
