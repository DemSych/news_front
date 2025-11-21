import React,{useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import style from './news.module.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import Loader from '../Loader/Loader';
import NewsLayout from '../../Lauouts/NewsLayouts/NewsLayout';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function news() {
  let navigate = useNavigate();
  let [newss, setNewss] = useState([]);
  let [userId, setUserId] = useState([]);
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
        setUserId(respons.data.id);
        
      }})
    }

  },[]);
  useEffect(()=>{
    setIsLoading(true);
   request({method:"GET", url: VITE_BACK_API + "/get-faile-active-news", callback: (respons)=>{
         
         setNewss(respons.data);
         setIsLoading(false);
        }
      });
   
   },[]);
   
  function onNewsChildren(newsId,authorId){
   if(authorId != userId){
       request({method:"POST", url: VITE_BACK_API + "/get-views-plus/"+ newsId, callback: (respons)=>{
                
               }
             });
   }
   
    navigate('/newsChildren/'+newsId);
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
          <a className={style.blok_content_all} href="#" onClick={() => onNewsChildren(news.id,news.author_id)}>
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
      </NewsLayout>
    </>
  )
}
