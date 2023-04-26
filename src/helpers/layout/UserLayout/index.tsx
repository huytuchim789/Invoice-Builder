import { Box } from '@mui/material';
import ResponsiveDrawer from './SideBar';

export const UserLayout = ({ children }: any) => {
  return (
    <Box>
      <ResponsiveDrawer />
      {children}
    </Box>
  );
};
