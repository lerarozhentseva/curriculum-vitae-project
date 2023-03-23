import { FC, FormEvent, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { UncontrolledTextField } from '@components/Input';
import { NotificationAlert } from '@components/NotificationAlert';
import { ILanguage } from '@interfaces/index';
import { CreateLanguageMutation } from '@graphql/languages/CreateLanguageMutation';
import { UpdateLanguageMutation } from '@graphql/languages/UpdateLanguageMutation';
import useLanguagesPage from '../../hooks/useLanguagesPage';

interface FormProps {
  isOpen: boolean;
  handleClose: () => void;
  language?: ILanguage;
}

export interface ILanguagesCreateResult {
  createLanguage: ILanguage;
}

export interface ILanguagesUpdateResult {
  updateLanguage: ILanguage;
}

const LanguageFormDialog: FC<FormProps> = ({ isOpen, handleClose, language }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [createLanguage, { error: errorLangCreate }] = useMutation<ILanguagesCreateResult>(
    CreateLanguageMutation
  );
  const [updateLanguage, { error: errorLangUpdate }] = useMutation<ILanguagesUpdateResult>(
    UpdateLanguageMutation
  );
  const { refetch, setIsOpen } = useLanguagesPage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const languageResult = {
      name: formData.get('langName') as string,
      iso2: formData.get('iso') as string,
      native: formData.get('natName') as string
    };

    try {
      if (language) {
        await updateLanguage({
          variables: {
            id: language.id,
            language: {
              name: languageResult.name,
              iso2: languageResult.iso2,
              native_name: languageResult.native || ''
            }
          }
        });
      } else {
        await createLanguage({
          variables: {
            language: {
              name: languageResult.name,
              iso2: languageResult.iso2,
              native_name: languageResult.native || ''
            }
          }
        });
      }
      refetch();
      handleClose();
    } catch {
      console.log(errorLangCreate?.message);
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{language ? 'Update Language' : 'Create Language'}</DialogTitle>
      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <UncontrolledTextField
            defaultValue={language?.name || ''}
            name="langName"
            label="Language Name"
            sx={{ mb: 2 }}
          />
          <UncontrolledTextField
            defaultValue={language?.iso2 || ''}
            name="iso"
            label="ISO Code"
            sx={{ mb: 2 }}
          />
          <UncontrolledTextField
            defaultValue={language?.native_name || ''}
            name="natName"
            label="Native Name"
            sx={{ mb: 2 }}
          />
          <Button type="button" onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="outlined" sx={{ ml: 2 }}>
            {language ? 'Update' : 'Create'}
          </Button>
          {errorLangCreate && (
            <NotificationAlert text={'Something went wrong!'} severity={'error'} sx={{ mt: 2 }} />
          )}
          {errorLangUpdate && (
            <NotificationAlert
              text={'Something went wrong while updating!'}
              severity={'error'}
              sx={{ mt: 2 }}
            />
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageFormDialog;
