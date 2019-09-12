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

export const SIGNIN_USERKYRIOS = gql`
mutation ($email: String!, $password:String!){
  signinUserKyrios(email:$email, password: $password) {
		token
  }
}
`;

export const EDIT_USER = gql`
  mutation ($firstname: String!, $lastname: String!, $email: String!, $password: String!, $creationDate: String!, $role: String!) {
    editUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password, creationDate: $creationDate, role: $role) {
      firstname
      lastname
      email
      password
      creationDate
      role
    }
  }
`;
