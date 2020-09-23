import React, {useEffect} from 'react';

import classes from './BackDrop.module.css';

const Backdrop = ({onClick}) => {
  useEffect(() => {
    const onKeypress = event => {
      if (event.key === 'Escape') {
        onClick();
      }
    };
    document.addEventListener('keydown', onKeypress);
  }, [onClick]);

  return <div className={classes.Backdrop} onClick={onClick} />;
};

export default Backdrop;
