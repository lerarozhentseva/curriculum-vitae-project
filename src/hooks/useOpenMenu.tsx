import { useState } from 'react';

type UseMenuReturnType = {
  isOpenMenu: boolean;
  handleOpenMenu: () => void;
  handleCloseMenu: () => void;
};

const useOpenMenu = (): UseMenuReturnType => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return { isOpenMenu, handleOpenMenu, handleCloseMenu };
};

export default useOpenMenu;
