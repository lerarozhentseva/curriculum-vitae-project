import { DocumentNode } from '@apollo/client';
import { ILoginResult, ISignupResult } from '@graphql/auth/IAuthResult';

export interface IFormErrors {
  email: string;
  password: string;
}

export interface FormProps {
  formType: {
    title: string;
    text: string;
    buttonText: string;
  };
  queryAuth: DocumentNode;
}

export interface IFormState {
  serverError: boolean;
  emailError: boolean;
  passError: boolean;
  formErrors: IFormErrors;
}

export type LoginOrSignupResult = ILoginResult | ISignupResult;
