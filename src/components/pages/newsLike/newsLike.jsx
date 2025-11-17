import React,{useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import style from './newsLike.module.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import Loader from '../Loader/Loader';
import ResultPages from '../resultPages/resultPages';
import NewsLayout from '../../Lauouts/NewsLayouts/NewsLayout';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function newsLike() {
  let navigate = useNavigate();
  let [newss, setNewss] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [isActive, setIsActive] = useState(false);
  let [result, setResult] = useState(null);
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
   request({method:"GET", url: VITE_BACK_API + "/get-faile-news-like", callback: (respons)=>{
         setNewss(respons.data);
         setIsLoading(false);
        }
      });
   
   },[]);
      
  function onNewsChildren(newsId){
   
    navigate('/newsChildren/'+newsId);
  }
 
  function comeNews(){
     window.location.reload();
  }
  return (
    <>
    <NewsLayout>
     {(isLoading)?
            <Loader />
           : 
           <>
   
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
       <div className={isActive ? style.active_block : style.isactive_block}>
                         
          <ResultPages 
          result = {result}
          functionResult = {comeNews}         
          />
        </div>
    </div>
     </>
      }
      </NewsLayout>
    </>
  )
}
