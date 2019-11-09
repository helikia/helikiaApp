import gql from 'graphql-tag';

export const GET_ESTABLISHEMENTS = gql`
    query {
        allEstablishements {
            _id
            name
            street
            cp
            slug
        }
    }
`;


export const GET_ESTABLISHEMENT = gql`
    query ($id: ObjectId!){
        getEstablishement (_id: $id) {
            _id
            name
            phone
            cp
            pricing
            categories
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