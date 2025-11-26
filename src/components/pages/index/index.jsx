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
     <h2 className={style.title_news_block}>НОВОСТИ</h2>
     <p className={style.content_news_block}>Приветствуем вас на новостном сайте! Для продолжения просмотра необходимо авторизоваться. Если у вас нет еще аккаунта, зарегистрируйтесь. </p>
    <div>
      <a href='#' className={style.btn_title} onClick={onAuth}>Авторизация</a>
      <a href='#' className={style.btn_title} onClick={onReg}>Регистрация</a>
    </div>
    </>
  )
}
