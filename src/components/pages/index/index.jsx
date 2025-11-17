import React from 'react';
import IndexLayouts from '../../Lauouts/IndexLayoyts/IndexLayouts';
import style from './index.module.css'
import { Navigate, useNavigate } from 'react-router-dom';
export default function index() {
  let navigate = useNavigate();
  function onAuth(){
    navigate("/auth");
  }
  function onReg(){
    navigate("/registration");
  }
  return (
    <>
     <h2 className={style.title_news_block}>Новостной блог</h2>
     <p className={style.content_news_block}>На сайт могут войти только авторизованные пользователм</p>
    <div>
      <a href='#' className={style.btn_title} onClick={onAuth}>Авторизация</a>
      <a href='#' className={style.btn_title} onClick={onReg}>Регистрация</a>
    </div>
    </>
  )
}
