import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { request } from '../../libs/request';
import { useParams } from 'react-router-dom';
import style from './newsChildren.module.css';
import { FcLike } from "react-icons/fc";
import { FaCalendarAlt } from "react-icons/fa";
import Loader from '../Loader/Loader';
import ResultPages from '../resultPages/resultPages';
import NewsLayout from '../../Lauouts/NewsLayouts/NewsLayout';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function newsChildren() {
    let navigate = useNavigate();
    let [newsChild, setNewsChild] = useState([]);
    let [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let { id } = useParams();
    let [isActive, setIsActive] = useState(false);
    let [result, setResult] = useState(null);
    useEffect(()=>{
      setIsLoading(true);
        if(!sessionStorage.getItem("token")){
            navigate("/auth");
        }
        else{
          request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            if(!respons.data){
              sessionStorage.removeItem("token");
              navigate("/auth");
            }
            setUser(respons.data);
          }})
        }
    
      },[]);
    useEffect(()=>{
      
       request({method:"GET", url: VITE_BACK_API + "/get-faile-newsChild/"+ id, callback: (respons)=>{
             setNewsChild(respons.data);
             setIsLoading(false);
            }
          });
       
       },[]);  
      
    function likePlus(){
              if(user.id != newsChild.author_id){
                 request({method:"POST", url: VITE_BACK_API + "/like-plus/"+ id, callback: (respons)=>{
                    setIsActive(!isActive);
                    setResult(respons.data);
                  }})
              }
              else{
                setIsActive(!isActive);
                setResult("Вы не можете поставить Like, т.к. являетесь автором статьи");
              }
    }
    function comeNewsChild(){
       window.history.back()
       
    }
  return (
    <>
      
      {(isLoading)?
        <Loader />
       : 
       
      <NewsLayout>
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
            <div className={isActive ? style.isactive_block : style.like}>
              <span className={style.Like_text}>Понравился блог? Поставьте Like!</span>
              <a className={style.like_icon} onClick={likePlus}><FcLike /></a>
            </div>
          </div>
      </div>
      <div className={isActive ? style.active_block : style.isactive_block}>
                  
          <ResultPages 
            result = {result}
            functionResult = {comeNewsChild}         
           />
      </div>
      </NewsLayout>
      }
      
    </>
  );
}
