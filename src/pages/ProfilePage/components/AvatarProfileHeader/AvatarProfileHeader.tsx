import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, FC, useRef } from 'react';
import { IUser } from '@interfaces/IUser';
import {
  StyledAvatar,
  StyledBox,
  StyledFileUploadIcon,
  StyledTypography,
  StyledAvatarCloseButton
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
    fileInputRef?.current?.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadAvatar(files);
    }
  };

  return (
    <>
      <StyledBox>
        <Box>
          {user?.profile.avatar && (
            <StyledAvatarCloseButton onClick={deleteAvatar}>
              <CloseIcon />
            </StyledAvatarCloseButton>
          )}
          <StyledAvatar src={user?.profile.avatar} alt="avatar">
            {getAvatarLetter(user)}
          </StyledAvatar>
        </Box>
        <form onClick={handleInputClick}>
          <StyledTypography variant="button">
            <StyledFileUploadIcon />
            Upload avatar image
          </StyledTypography>
          <Typography color={'grey'}>png, jpg or gif no more than 0.5MB</Typography>
          <input type="file" hidden ref={fileInputRef} onChange={handleInputChange} />
        </form>
      </StyledBox>
      <Typography mt={2} fontSize="25px">{`${user?.profile.first_name || ''} ${user?.profile
        .last_name || ''}`}</Typography>
      <Typography>{user?.email}</Typography>
      <Typography mb={4}>{formatCreateDate(user?.created_at)}</Typography>
    </>
  );
};

export default AvatarProfileHeader;
