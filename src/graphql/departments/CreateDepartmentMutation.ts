import { gql } from '@apollo/client';

export const CreateDepartmentMutation = gql`
  mutation CreateDepartment($department: DepartmentInput!) {
    createDepartment(department: $department) {
      id
    }
  }
`;
