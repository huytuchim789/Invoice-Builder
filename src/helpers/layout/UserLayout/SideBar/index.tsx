// ** React Import
import * as React from 'react';

// ** Mui Import
import Box from '@mui/material/Box';

// ** Component imports
import { DrawerMobile } from './components/DrawerMobile';
import { DrawerDesktop } from './components/DrawerDesktop';

export const drawerWidth = 240;

export default function ResponsiveDrawer() {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <DrawerDesktop />
      <DrawerMobile />
    </Box>
  );
}
