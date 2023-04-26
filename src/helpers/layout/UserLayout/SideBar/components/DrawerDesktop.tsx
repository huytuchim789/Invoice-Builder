import { Drawer } from '@mui/material';
import { drawerWidth } from '..';
import { drawer } from '../atom/drawer';

export const DrawerDesktop = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
};
