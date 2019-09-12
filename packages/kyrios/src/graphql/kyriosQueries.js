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
        userKyrios {
            firstname
            lastname
            email
            role
            creationDate
        }
    }
`;

export const GET_USER_KYRIOS = gql`
    query {
        userKyrios {
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
