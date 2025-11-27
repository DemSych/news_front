import React,{useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import style from './dashboard.module.css';
import DashboardLayouts from '../../Lauouts/DashboardLayouts/DashboardLayouts';
import Loader from '../Loader/Loader';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function dashboard() {
let navigate = useNavigate();
  let [newss, setNewss] = useState([]);
  let [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        if(respons.data.admin != 'admin'){
               navigate("/news");
            }
        setUser(respons.data);
        request({method:"GET", url: VITE_BACK_API + "/get-faile-news", callback: (respons)=>{
           
           setNewss(respons.data);
           setIsLoading(false);
          }
        });     
      }})
    }

  },[]);
  
function blockedNews(newsId, status){
      if(status == 'active'){
            request({method:"GET", url: VITE_BACK_API + "/get-faile-blockedNews/"+ newsId, callback: (respons)=>{
                        window.location.reload();
                        }
                      });
       } 
    } 
function activNews(newsId, status){
         if(status != 'active'){
            request({method:"GET", url: VITE_BACK_API + "/get-faile-activeNews/"+ newsId, callback: (respons)=>{
                        window.location.reload();
                        }
                      });
       }    
    }

  return (
    <>
    {(isLoading)?
                <Loader />
               : 
    <div className={style.container }>
        <DashboardLayouts/>
        
        <div className={style.page_content}>

            <header className={style.nav_center}>
                
              
                
                <div className={style.nav_link}>
                    <div className={style.botton_right}>
                        <a type="button" className={style.items_center}>
                            <img src={user.avatar} alt="Аватар" className={style.rounded_full}/>
                            <span className={style.items_center}>
                                <h5 className={style.text_base}>{user.name}</h5>
                            </span>
                        </a>
                       
                    </div>
                </div>
            </header>
            <main className={style.main_content}>  
                <div className={style.header_content}>
                    <div>
                        <h4 className={style.text_slate}>Dashboard</h4>

                    </div>
                </div>
                            <div className={style.sticky_top}>
                                
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={style.t_title}>Title</th>
                                            <th className={style.t_discrip}>Description</th>
                                            <th className={style.t_status}>Status</th>
                                            <th className={style.t_control}>Сontrol</th>
                                        </tr>
                                    </thead>
                                    {newss.map((news)=>(
                                    <tbody key={news.id}>
                                        <tr>
                                            <td className={style.t_title}>{news.title}</td>
                                            <td className={style.t_discrip}>{news.short_content}</td>
                                            <td className={style.t_status}>{news.status}</td>
                                            <td className={style.t_control}>
                                                <div className={style.button_conteiner}>
                                                    <a href="#" className={style.button_redact} onClick={() => blockedNews(news.id, news.status)}>Заблокировать</a>
                                                    <a href="#" className={style.button_delete} onClick={() => activNews(news.id, news.status)}>Разблокировать</a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                     ))}
                                </table>
                            </div>            
            </main>

        </div>
    </div>
    
      }
    </>
  )
}
