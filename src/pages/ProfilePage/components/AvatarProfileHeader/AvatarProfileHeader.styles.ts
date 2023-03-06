import { Box, Avatar, styled, Typography, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export const StyledBox = styled(Box)({
  display: 'flex',
  gap: '60px',
  alignItems: 'center'
});

export const StyledAvatar = styled(Avatar)({
  width: '130px',
  height: '130px',
  fontSize: '33px'
});

export const StyledTypography = styled(Typography)({
  display: 'flex',
  fontSize: '20px',
  alignItems: 'center',
  cursor: 'pointer'
});

export const StyledFileUploadIcon = styled(FileUploadIcon)({
  marginRight: 1
});

export const StyledAvatarCloseButton = styled(Button)({
  marginLeft: '90px',
  marginBottom: '-10px',
  borderRadius: '50%'
});
