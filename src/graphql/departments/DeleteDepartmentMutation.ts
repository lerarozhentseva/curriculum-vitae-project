import { gql } from '@apollo/client';

export const DeleteDepartmentMutation = gql`
  mutation DeleteDepartment($id: ID!) {
    deleteDepartment(id: $id) {
      affected
    }
  }
`;
