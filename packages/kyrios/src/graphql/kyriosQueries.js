import gql from 'graphql-tag';

export const GET_ESTABLISHEMENTS = gql`
    query {
        allEstablishements {
            name
            street
            cp
        }
    }
`;

export const GET_USERS = gql`
    query {
        allUserKyrios {
            firstname
            lastname
            email
            role
            creationDate
        }
    }
`;

export const GET_ME = gql`
    query {
        me {
            name
            firstname
            lastname
        }
    }
`;
