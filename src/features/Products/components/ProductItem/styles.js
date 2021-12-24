import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    padding: 5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  img: {
    transform: `translateX(10px)`,
    height: 235,
    margin: '0 auto',
    width: '240px!important',
    objectFit: 'cover!important',
  },
  actions: {
    marginTop: 'auto',
    justifyContent: 'space-evenly',
  },
  descriptionProduct: {
    minHeight: '40px',
  },
  button: {
    margin: '10px 5px 0 5px',
    whiteSpace: 'nowrap',
  },
});
