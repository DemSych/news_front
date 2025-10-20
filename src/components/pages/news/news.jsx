import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import { request } from '../../libs/request';
import style from './news.module.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaEye } from "react-icons/fa";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function news() {
  let navigate = useNavigate();
  let [newss, setNewss] = useState([]);
  //let newss = [];
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
   request({method:"GET", url: VITE_BACK_API + "/get-faile-news", callback: (respons)=>{
         
         setNewss(respons.data);
         
        }
      });
   
   },[]);
   
  function onLK(){
    request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
        if(respons.data.author == 1){
           navigate("/LK");
        }
      }})
  }
  function exit(){
    sessionStorage.removeItem("token");
    navigate("/auth");
  }
  function onLike(){
    let newNewss = [];
    let a = null;
    for (let news of newss) {
      if(news.like > a){
        a = news.like;
        
      };
    }
   for (let i = 0; i < newss.length; i++) {
      let b = null;
      for (let news of newss) {
        if(news.like == a){
          newNewss.push(news);
        };
        if(news.like < a && news.like > b){
          b = news.like;
        }
      }
      a = b;
    }
    setNewss(newNewss);
  }
  function onViews(){
    let newNewss = [];
    let a = null;
   
    
    for (let news of newss) {
      if(news.views > a){
        a = news.views;
        
      };
    }
   for (let i = 0; i < newss.length; i++) {
      let b = null;
      for (let news of newss) {
        if(news.views == a){
          newNewss.push(news);
        };
        if(news.views < a && news.views > b){
          b = news.views;
        }
      }
      a = b;
    }
    setNewss(newNewss);
  }
  function onNewsChildren(news){
    console.log(news);
    //navigate("/newsChildren");
  }
  return (
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
          <a className={style.blok_content_all} href="#" onClick={onNewsChildren(news)}>
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
    <img src = {news.img}></img>
    </>
  )
}
