import { Box, Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Box
      sx={{ width: '500px', height: '250px', backgroundColor: 'secondary.main', m: '200px auto' }}
    >
      <Typography variant="h3" sx={{ textAlign: 'center', pt: '50px' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Page not found
      </Typography>
    </Box>
  );
};
