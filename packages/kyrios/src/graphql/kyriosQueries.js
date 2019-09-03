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

export const GET_ESTABLISHEMENT = gql`
    query {
        allEstablishements {
            name
            street
            cp
        }
    }
`;
