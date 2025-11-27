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
    
    {(isLoading)?
                <Loader />
               : 
        <LKLayouts>     
        <div className={style.continer}>
            <p className={isActive ? style.active_block : style.isactive_block}>
                        У вас пока нет постов!     
            </p>
            <div className={style.sticky_top}>
                
                <table>
                    {/* <thead>
                        <tr>
                            <th className={style.news_title_th}>Title</th>
                            <th className={style.news_discript_th}>Description</th>
                            <th className={style.news_img_th}>Imges</th>
                            <th className={style.news_content_th}>Content</th>
                            <th className={style.news_status_th}>Status</th>
                            <th className={style.news_date_th}>Date</th>
                            <th className={style.news_control_th}>Control</th>
                        </tr>
                    </thead> */}
                    {newss.map((news)=>(
                    <tbody key={news.id}>
                        <tr>
                            <th className={style.th}>Title</th>
                            <td className={style.td}>{news.title}</td>
                        </tr>
                        <tr>
                            <th className={style.th}>Description</th>
                            <td className={style.td}>{news.short_content}</td>
                        </tr>
                        <tr>
                            <th className={style.th}>Imges</th>
                            <td className={style.td}><img src={news.news_img} className={style.imges_content}/></td>
                        </tr>
                        <tr>
                            <th className={style.th}>Content</th>
                            <td className={style.td}>{news.content}</td>
                        </tr>
                        <tr>
                            <th className={style.th}>Status</th>
                            <td className={style.td}>{news.status}</td>
                        </tr>
                        <tr>
                            <th className={style.th}>Date</th>
                            <td className={style.td}>{news.date}</td>
                        </tr>
                        <tr>
                            <th ></th>
                                <div className={style.button_conteiner}>
                                    <a href="#" className={style.button_redact} onClick={() => redactNews(news.id)}>Редактировать</a>
                                    <a href="#" className={style.button_delete} onClick={() => deleteNews(news.id)}>Удалить</a>
                                 </div>
                        </tr>
                    </tbody>
                    ))}
                </table>
                
            </div>
            
        </div>
        </LKLayouts>
        } 
        
    </>
  )
}
