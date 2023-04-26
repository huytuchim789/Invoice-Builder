import { Drawer } from '@mui/material';
import { IDataStatusMenu, useStatusMenu } from 'src/stores/useStatusMenu';
import { drawer } from '../atom/drawer';
import { drawerWidth } from '..';

export const DrawerMobile = () => {
  const [statusMenu, update] = useStatusMenu((state: IDataStatusMenu) => [
    state.statusMenu,
    state.update,
  ]);

  const handleDrawerToggle = () => {
    update(!statusMenu);
  };

  return (
    <Drawer
      variant="temporary"
      open={statusMenu}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
};
