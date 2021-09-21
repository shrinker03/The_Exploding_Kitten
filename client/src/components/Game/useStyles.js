import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
}));

export default useStyles;
