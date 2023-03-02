import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { IUser } from '@interfaces/IUser';
import {
  StyledAvatar,
  StyledBox,
  StyledFileUploadIcon,
  StyledTypography
} from './AvatarProfileHeader.styles';

interface AvatarProfileHeaderProps {
  user?: IUser;
}

const getAvatarLetter = (user?: IUser) => {
  if (!user) return '';

  const { first_name, last_name } = user.profile;
  console.log(user.profile);

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

const AvatarProfileHeader: FC<AvatarProfileHeaderProps> = ({ user }) => {
  return (
    <>
      <StyledBox>
        <Box>
          <StyledAvatar alt="avatar">{getAvatarLetter(user)}</StyledAvatar>
        </Box>
        <form>
          <StyledTypography variant="button">
            <StyledFileUploadIcon />
            Upload avatar image
          </StyledTypography>
          <Typography color={'grey'}>png, jpg or gif no more than 0.5MB</Typography>
          <input type="file" hidden />
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
