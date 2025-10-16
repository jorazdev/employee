

import { gql } from 'graphql-tag'

export const UPDATE_ABSENCE_MUTATION = gql`
    mutation UpdateAbsenceEmployee($updateAbsInput: UpdateAbsEmpInput!) {
        updateAbsenceEmployee(updateAbsInput: $updateAbsInput) {
            abscenceId
            endDate
            firstName
            lastName
            personnelNumber
            startDate
        }
}
`

export const ABSENCES_QUERY = gql`
    query Absences {
        absences {
            id
            employee {
                id
                firstName
                lastName
                personnelNumber
            }
            endDate
            reason
            startDate
        }
    }
`

export const EMPLOYES_ABSENCES = gql`
    query EmployesAbsences {
        employesAbsences {
            abscenceId
            endDate
            firstName
            lastName
            personnelNumber
            startDate
        }
    }
`