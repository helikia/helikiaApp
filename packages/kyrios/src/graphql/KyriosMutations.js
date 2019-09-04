/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { userKyriosFragment } from './KyriosFragments';

export const UPSERT_USER_KYRIOS = gql`
${userKyriosFragment}

  mutation UpsertUserKyrios($user: UserKyriosInput!) {
    upsertUserKyrios(user: $user) {
        ...userKyriosFields
        creationDate
    }
  }
`;
