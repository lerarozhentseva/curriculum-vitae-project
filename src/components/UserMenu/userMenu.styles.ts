export const MenuPaperProps = {
  overflow: 'visible',
  width: '250px',
  filter: 'drop-shadow(0px 3px 10px rgba(0,0,0,0.5))',
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    backgroundColor: 'background.paper',
    zIndex: 0,
    top: 0,
    right: 30,
    width: 10,
    height: 10,
    transform: 'translateY(-50%) rotate(45deg)'
  }
};
