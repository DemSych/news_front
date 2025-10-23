import React,{useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import style from './news.module.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import Loader from '../loader/loader';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function news() {
  let navigate = useNavigate();
  let [newss, setNewss] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
   request({method:"GET", url: VITE_BACK_API + "/get-faile-news", callback: (respons)=>{
         
         setNewss(respons.data);
         setIsLoading(false);
        }
      });
   
   },[]);
   
  function onLK(){
    request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
        if(respons.data.author == 1){
           navigate("/LK");
        }
        else{
          alert("Необходимы права редактора");
        }
      }})
  }
  function exit(){
    sessionStorage.removeItem("token");
    navigate("/auth");
  }
  function onLike(){
    let newNewss = [];
    let first_max = null;
    for (let news of newss) {
      if(news.like > first_max){
        first_max = news.like;
        
      };
    }
   for (let i = 0; i < newss.length; i++) {
      let second = null;
      for (let news of newss) {
        if(news.like == first_max){
          newNewss.push(news);
        };
        if(news.like < first_max && news.like > second){
          second = news.like;
        }
      }
      first_max = second;
    }
    setNewss(newNewss);
  }
  function onViews(){
    let newNewss = [];
    let first_max = null;
   
    
    for (let news of newss) {
      if(news.views > first_max){
        first_max = news.views;
        
      };
    }
   for (let i = 0; i < newss.length; i++) {
      let second = null;
      for (let news of newss) {
        if(news.views == first_max){
          newNewss.push(news);
        };
        if(news.views < first_max && news.views > second){
          second = news.views;
        }
      }
      first_max = second;
    }
    setNewss(newNewss);
  }
  function onNewsChildren(newsId){
   
    navigate('/newsChildren/'+newsId);
  
    
   // navigate("/newsChildren");
  }
  return (
    <>
     {(isLoading)?
            <Loader />
           : 
           <>
    <div className={style.menu}>
       <h2 className={style.name_menu}>Новостной блог</h2>
       
        <div className={style.nav_news}>
				  <ul className={style.news_menu}>
					  <li className={style.button_menu} ><a href="#" className={style.button} onClick={onLike}>По Like</a></li>
            <li className={style.button_menu} ><a href="#" className={style.button} onClick={onViews}>По просмотрам</a></li>
				  </ul>
			  </div>
      
       <div className={style.nav_menu}>
				  <ul className={style.main_menu}>
					  <li className={style.button_menu}><a href="#" className={style.button} onClick={onLK}>Личный кабинет</a></li>
					  <li className={style.button_menu}><a href="#" className={style.button} onClick={exit}>Выход</a></li>
				  </ul>				
			</div>
    </div>
    <div className={style.content_news}>
      
      
      {newss.map((news)=>(
        <div className={style.blok_content} key={news.id}>
          <a className={style.blok_content_all} href="#" onClick={() => onNewsChildren(news.id)}>
            <div className={style.content_image}><img src = {news.news_img} alt="изображение" className={style.image_news}/></div>
            <h3 className={style.header_news}>{news.title}</h3>
            <div className={style.calendar}>
              <span className={style.icon_calendar}><FaCalendarAlt /></span>
              <span className={style.date_calendar}>{news.date}</span>
              <span className={style.lake}><FcLike /></span>
              <span className={style.lake_namber}>{news.like}</span>
              <span className={style.lake}><FaEye /></span>
              <span className={style.lake_namber}>{news.views}</span>
            </div>
          </a>
        </div>
      ))}
       
    </div>
     </>
      }
    </>
  )
}
