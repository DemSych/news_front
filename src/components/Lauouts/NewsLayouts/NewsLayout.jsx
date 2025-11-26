import React,{useEffect, useState} from 'react'
import style from './NewsLayouts.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';


let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function NewsLayout(props){
    let [isActive, setIsActive] = useState(false);
    let navigate = useNavigate();
    function onAdmin(){
        request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            if(respons.data.admin == 'admin'){
               navigate("/dashboard");
            }
            else{
              setIsActive(!isActive);
            }
          }})
      }
      function exit(){
        sessionStorage.removeItem("token");
        navigate("/auth");
      }
      function onLike(){
        navigate('/newsLike');      
      }
      function onDate(){
        navigate('/news');
      }
      function reboot(){
         window.location.reload();
      }
      
    return (

    <>
    <div className={style.menu}>
           <h2 className={style.name_menu}>Новостной блог</h2>
           
            <div className={style.nav_news}>
                      <ul className={style.news_menu}>
                          <li className={style.button_menu} ><a href="#" className={style.button} onClick={onDate}>Свежие новости</a></li>
                          <li className={style.button_menu} ><a href="#" className={style.button} onClick={onLike}>Популярные новости</a></li>
                      </ul>
                  </div>
          
           <div className={style.nav_menu}>
                      <ul className={style.main_menu}>
                          <li className={style.button_menu}><a href="#" className={style.button} onClick={onAdmin}>Admin</a></li>
                          <li className={style.button_menu}><a href="#" className={style.button} onClick={exit}>Выход</a></li>
                      </ul>				
                </div>
        </div>
    {props.children}
    <div className={isActive ? style.active_block : style.isactive_block}>
                      
             <h3 className={style.header_error}>Доступ закрыт. Необходимы права администратора</h3>
             <a className={style.button_error} href="#" onClick={reboot}>Продолжить</a>
    </div>
    </>
  )
}
