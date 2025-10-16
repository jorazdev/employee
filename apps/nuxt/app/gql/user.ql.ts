import { gql } from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
    mutation Register($input: SignInput!) {
        register(input: $input) {
            avatarUrl
            email
            firstName
            id
            lastName
        }
    }
`

export const SIGNIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            access_token
        }
    }
`

export const USERS_QUERY = gql`
    query Users {
        users {
            active
            avatarUrl
            email
            firstName
            id
            identity
            isSocial
            lastName
            picture
            token
        }
    }
`