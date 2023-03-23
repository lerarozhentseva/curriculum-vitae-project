import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { ILanguage } from '@interfaces/index';
import DeleteLanguageComponent from '../DeleteLanguageComponent/DeleteLanguageComponent';
import useLanguagesPage from '../../hooks/useLanguagesPage';
import LanguageFormDialog from '../LanguageFormDialog/LanguageFormDialog';

interface ILanguagesRowActionsProps {
  language: ILanguage;
}

function LanguagesTableRowActions({ language }: ILanguagesRowActionsProps) {
  const { isOpen, handleClickOpen, handleClickClose } = useLanguagesPage();

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <LanguageFormDialog isOpen={isOpen} handleClose={handleClickClose} language={language} />
      <DeleteLanguageComponent language={language} />
    </>
  );
}

export default LanguagesTableRowActions;
