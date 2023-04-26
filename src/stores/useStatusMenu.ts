import create, { SetState } from 'zustand';
import { AlertColor } from '@mui/material';

export interface IDataStatusMenu {
  statusMenu: boolean;
  update: (state: boolean) => void;
}

const updateStatusMenu = (set: SetState<IDataStatusMenu>) => (updatedInfo: boolean) =>
  set(() => {
    return { statusMenu: updatedInfo };
  });

export const useStatusMenu = create<IDataStatusMenu>((set) => ({
  statusMenu: false,
  update: updateStatusMenu(set),
}));
