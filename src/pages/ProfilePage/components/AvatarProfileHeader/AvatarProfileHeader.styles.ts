import { Box, Avatar, styled, Typography, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export const StyledBox = styled(Box)({
  display: 'flex',
  gap: '60px',
  alignItems: 'center',
  position: 'relative'
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
  borderRadius: '50%',
  position: 'absolute',
  top: '-20px',
  left: '120px'
});

export const StyledForm = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '500px',
  alignItems: 'center',
  justifyContent: 'space-between'
});
