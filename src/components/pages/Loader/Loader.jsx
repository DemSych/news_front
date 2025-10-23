import React from 'react'
import style from "./Loader.module.css"
export default function Loader() {
  return (
    <div className={style.loader_container}>
      <div className={style.loader}><span className={style.load}>Загрузка</span></div>
    </div>
  )
}

