import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  main: {
    marginTop: 64,
    height: 'calc(100% - 64px)',
    display: 'flex',
    overflow: 'auto',
  },
  containerNavbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightMenu: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
});
