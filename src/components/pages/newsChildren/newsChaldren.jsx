import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { request } from '../../libs/request';
import { useParams } from 'react-router-dom';
import style from './newsChildren.module.css';
import { FcLike } from "react-icons/fc";
import imges from '../imges/image.jpg';
import { FaCalendarAlt } from "react-icons/fa";
import Loader from '../loader/loader';


let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function newsChildren() {
    let navigate = useNavigate();
    let [newsChild, setNewsChild] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let { id } = useParams();
    
    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate("/auth");
        }
        else{
          request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            if(!respons.data){
              sessionStorage.removeItem("token");
              navigate("/auth");
            }
          }})
        }
    
      },[]);
    useEffect(()=>{
      setIsLoading(true);
       request({method:"GET", url: VITE_BACK_API + "/get-faile-newsChild/"+ id, callback: (respons)=>{
             
             setNewsChild(respons.data);
             setIsLoading(false);
            }
          });
       
       },[]);  
      
    function exit(){
    sessionStorage.removeItem("token");
    navigate("/auth");
    }
    function comeBack(){
    navigate("/news");
    }
    function likePlus(){
      request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
              if(respons.data.author != 1){
                 request({method:"POST", url: VITE_BACK_API + "/like-plus/"+ id, callback: (respons)=>{
                    console.log(respons);
                  }})
              }
              else{
                  alert("Вы не можете оставить отзыв");
              }
            }})
    }
    
  return (
    <>
      {(isLoading)?
        <Loader />
       : 
       <>
      <div className={style.menu}>
          <h2 className={style.name_menu}>Новостной блог</h2>
          <div className={style.nav_menu}>
            <ul className={style.main_menu}>
              <li className={style.button_menu}><a href="#" className={style.button} onClick={comeBack}>К списку новостей</a></li>
              <li className={style.button_menu}><a href="#" className={style.button} onClick={exit}>Выход</a></li>
            </ul>				
          </div>
      </div>
      <div className={style.newss}>
          <div className={style.header_news}>
            <div className={style.header_text_news}>
              <h3 className={style.title_news}>{newsChild.title}</h3>
              <p className={style.short_content_news}>{newsChild.short_content}</p>
              <div className={style.calendar}>
                <span className={style.icon_calendar}><FaCalendarAlt /></span>
                <span className={style.date_calendar}>{newsChild.date}</span>
              </div>
            </div>
            <div className={style.header_imges_news}>
              <img src = {newsChild.news_img} alt="изображение" className={style.image_news}/>
            </div>
          </div>
          <div className={style.content_news}>
            <p className={style.content_news_text}>{newsChild.content}</p>
            <div className={style.like}>
              <span className={style.Like_text}>Понравился блог? Поставьте Like!</span>
              <a className={style.like_icon} onClick={likePlus}><FcLike /></a>
            </div>
          </div>
      </div>
      </>
      }
    </>
  );
}
