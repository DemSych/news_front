import React from 'react'
import style from './IndexLayouts.module.css'

export default function IndexLayouts(props) {
  return (
    <div>
       <h1>Начало шаблона</h1> 
            {props.children}
        <p>Конец шаблона</p>
        
    </div>
  )
}
