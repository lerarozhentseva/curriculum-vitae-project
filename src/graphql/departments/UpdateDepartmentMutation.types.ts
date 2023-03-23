export interface IUpdateDepartmentMutationReturnValue {
  id: string;
}

export interface IUpdateDepartmentMutationParameters {
  id: string;
  department: {
    name: string;
  };
}
