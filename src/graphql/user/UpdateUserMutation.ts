import { gql } from '@apollo/client';

export const UpdateUserMutation = gql`
  mutation UpdateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      created_at
      email
      is_verified
      profile {
        id
        created_at
        first_name
        last_name
        full_name
        avatar
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
      }
      cvs {
        id
        created_at
        name
        description
        projects {
          id
          created_at
          name
          internal_name
          description
          domain
          start_date
          end_date
          team_size
          tech_stack {
            id
            created_at
            name
          }
        }
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
        is_template
      }
      department {
        id
        created_at
        name
      }
      department_name
      position {
        id
        created_at
        name
      }
      position_name
      role
    }
  }
`;
