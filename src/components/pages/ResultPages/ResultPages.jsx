import React from 'react'
import style from './ResultPages.module.css'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';

export default function ResultPages(props) {
    
    let result = props.result;
    
  return (
    <>
        <h3 className={style.successfully}>{result}</h3>
        
        <Button event={props.functionResult}></Button>
    </>
  )
}
