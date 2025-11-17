import React from 'react'
import style from './Button.module.css';
export default function Button(props) {
  return (
    <>
            <button 
                onClick={props.event} className={style.btn_successfully}
            >
              Продолжить
            </button>
        </>
  )
}
