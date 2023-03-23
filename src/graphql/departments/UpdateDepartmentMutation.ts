import { gql } from '@apollo/client';

export const UpdateDepartmentMutation = gql`
  mutation UpdateDepartment($id: ID!, $department: DepartmentInput!) {
    updateDepartment(id: $id, department: $department) {
      id
    }
  }
`;
