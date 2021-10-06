import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    unitSelect: {
      height: '0em',
      width: '0em',
      size: 'small',
      backgroundColor: 'black',
      color: 'rgb(229, 230, 229)',
      '&.Mui-checked': {
        color: 'rgb(229, 230, 229)'
      },
    },
  }
));

export default useStyles;