import React, { useEffect } from 'react';
import classes from './BackDrop.module.css';

const Backdrop = (props) => {
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === 'Escape') {
        console.log('event go');
        props.onClick();
      }
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);

  return <div className={classes.Backdrop} onClick={props.onClick} />;
};

export default Backdrop;
