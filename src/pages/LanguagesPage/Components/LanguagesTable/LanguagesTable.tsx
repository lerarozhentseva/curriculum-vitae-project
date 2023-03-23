import { FC } from 'react';
import { ILanguage } from '@interfaces/index';
import { useSort } from '@hooks/index';
import { AppTable } from '@components/AppTable';
import LanguagesTableRow from '../LanguagesTableRow/LanguagesTableRow';

export interface ILanguagesTableProps {
  languages: ILanguage[];
  isLoading: boolean;
}

const LanguagesTable: FC<ILanguagesTableProps> = ({ languages, isLoading }) => {
  const [sortedLanguages, sortingRules, cycleSortingRules, isLoadingSort] = useSort(
    languages,
    'name'
  );

  const fields: ([keyof ILanguage, string] | undefined)[] = [
    ['name', 'Language Name'],
    ['iso2', 'ISO Code'],
    undefined
  ];

  return (
    <AppTable<ILanguage[]>
      sortingRules={sortingRules}
      cycleSortingRules={cycleSortingRules}
      fields={fields}
      data={sortedLanguages}
      isLoading={isLoading}
    >
      {(language, key) => (
        <LanguagesTableRow
          language={language}
          isLoading={isLoading}
          key={key}
          isLoadingSort={isLoadingSort}
        />
      )}
    </AppTable>
  );
};

export default LanguagesTable;
