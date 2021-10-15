import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  unitSelect: {
    height: '0em',
    width: '0em',
    size: 'small',
    backgroundColor: 'rgb(0, 0, 0, .5)',
    color: 'rgb(229, 230, 229, .5)',
    '&.Mui-checked': {
      color: 'rgb(229, 230, 229)',
    },
  },
}));

export default useStyles;
