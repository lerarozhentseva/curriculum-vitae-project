import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import { IUser } from '@interfaces/IUser';
import DragAndDrop from '@pages/ProfilePage/components/DragAndDrop/DragAndDrop';
import {
  StyledAvatar,
  StyledBox,
  StyledFileUploadIcon,
  StyledTypography,
  StyledAvatarCloseButton,
  StyledForm
} from './AvatarProfileHeader.styles';

interface AvatarProfileHeaderProps {
  user?: IUser;
  deleteAvatar: () => void;
  uploadAvatar: (event: FileList | null) => void;
}

const getAvatarLetter = (user?: IUser) => {
  if (!user) return '';

  const { first_name, last_name } = user.profile;

  if (first_name && last_name) {
    return `${first_name[0].toUpperCase()}${last_name[0].toUpperCase()}`;
  } else {
    return user.email[0].toUpperCase();
  }
};

const formatCreateDate = (createDate?: string) => {
  if (!createDate) return '';
  return `A member since ${new Date(+createDate).toDateString()}`;
};

const AvatarProfileHeader: FC<AvatarProfileHeaderProps> = ({
  user,
  deleteAvatar,
  uploadAvatar
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleInputClick = () => {
    if (!user?.profile.avatar) {
      fileInputRef?.current?.click();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadAvatar(files);
    }
  };

  useEffect(() => {
    const handlePrevent = (event: DragEvent) => {
      event.preventDefault();
    };

    window.addEventListener('dragover', handlePrevent, false);
    window.removeEventListener('drop', handlePrevent, false);
  }, []);

  return (
    <>
      <StyledBox>
        {user?.profile.avatar && (
          <StyledAvatarCloseButton onClick={deleteAvatar}>
            <CloseIcon />
          </StyledAvatarCloseButton>
        )}
        <DragAndDrop uploadAvatar={uploadAvatar}>
          <StyledForm component={'form'} onClick={handleInputClick}>
            <Box>
              <StyledAvatar src={user?.profile.avatar} alt="avatar">
                {getAvatarLetter(user)}
              </StyledAvatar>
            </Box>
            <Box>
              <StyledTypography variant="button">
                <StyledFileUploadIcon />
                Upload avatar image
              </StyledTypography>
              <Typography color={'grey'}>png, jpg or gif no more than 0.5MB</Typography>
              <input type="file" hidden ref={fileInputRef} onChange={handleInputChange} />
            </Box>
          </StyledForm>
        </DragAndDrop>
      </StyledBox>
      <Typography mt={2} fontSize="25px">{`${user?.profile.first_name || ''} ${user?.profile
        .last_name || ''}`}</Typography>
      <Typography>{user?.email}</Typography>
      <Typography mb={4}>{formatCreateDate(user?.created_at)}</Typography>
    </>
  );
};

export default AvatarProfileHeader;
