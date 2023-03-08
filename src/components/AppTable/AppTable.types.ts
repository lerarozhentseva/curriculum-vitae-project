import { ReactNode } from 'react';

export interface IAppTableSortCellProps<T extends any[]> {
  children: ReactNode;
  field: ISortingRules<T>['field'];
  rules: ISortingRules<T>;
  cycleRules: (field: ISortingRules<T>['field']) => void;
}

export interface IAppTableHeadProps<T extends any[]> {
  fields: ([keyof T[number], string] | undefined)[];
  sortingRules: ISortingRules<T>;
  cycleSortingRules: (field: keyof T[number]) => void;
}

export interface IAppTableProps<T extends any[]> extends IAppTableHeadProps<T> {
  children: ReactNode;
}

export interface ISortingRules<T extends any[]> {
  field: keyof T[number];
  order: SortingOrder;
}

export enum SortingOrder {
  ASC = 0,
  DESC = 1
}
