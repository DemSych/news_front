import React, {useEffect, useState} from 'react';
import style from './LK.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import Loader from '../Loader/Loader';
import LKLayouts from '../../Lauouts/LKLayouts/LKLayouts';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function LK() {
    let navigate = useNavigate();
    let [newss, setNewss] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [isActive, setIsActive] = useState(false);
    let userId = null;
    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate("/auth");
        }
        else{
           setIsLoading(true); 
          request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            if(!respons.data){
              sessionStorage.removeItem("token");
              setIsLoading(false);
              navigate("/auth");
            }
            else{
                userId = respons.data.id;
                 
                 request({method:"GET", url: VITE_BACK_API + "/faile-news-autor/"+ userId, callback: (respons)=>{
                   if(respons.data.length!= 0){
                        setNewss(respons.data);
                        
                   }
                   else{
                       setIsActive(!isActive); 
                   }
                    setIsLoading(false);
                  }
                });
            }
            
          }})
        }
    
      },[]);
    
    function deleteNews(newsId){
        navigate('/deleteNews/'+newsId);  
    }
    function redactNews(newsId){
        navigate('/newsRedact/'+newsId);
    }
    return (
    <>
    <LKLayouts>
    {(isLoading)?
                <Loader />
               : 
        <div className={style.continer}>
            <p className={isActive ? style.active_block : style.isactive_block}>
                        У вас пока нет постов!     
            </p>
            {newss.map((news)=>(
            <div className={style.sticky_top} key={news.id}>
                
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Imges</th>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{news.title}</td>
                            <td>{news.short_content}</td>
                            <td><img src={news.news_img} className={style.imges_content}/></td>
                            <td>{news.content}</td>
                            <td>{news.status}</td>
                            <td>{news.date}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={style.button_conteiner}>
                    <a href="#" className={style.button_redact} onClick={() => redactNews(news.id)}>Редактировать</a>
                    <a href="#" className={style.button_delete} onClick={() => deleteNews(news.id)}>Удалить</a>
                </div>
                
            </div>
            ))}
        </div>
        } 
        </LKLayouts>
    </>
  )
}
