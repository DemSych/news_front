import React, {useEffect, useState} from 'react';
import style from './LK.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import Loader from '../loader/loader';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function LK() {
    let navigate = useNavigate();
    let [newss, setNewss] = useState([]);
    let [user, setUser] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let userId = null;
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
            else{
                setUser(respons.data);
                userId = respons.data.id;
                 setIsLoading(true);
                 request({method:"GET", url: VITE_BACK_API + "/faile-news-autor/"+ userId, callback: (respons)=>{
                   setNewss(respons.data);
                   setIsLoading(false);
                  }
                });
            }
          }})
        }
    
      },[]);
    
    function exit(){
        sessionStorage.removeItem("token");
        navigate("/auth");
        }
    function comeBack(){
        navigate("/news");
        }
    function newNews(){
        navigate("/newNews");
    }
    return (
    <>
    {(isLoading)?
                <Loader />
               : 
        <div className={style.continer}>
            <div className={style.simplebar_content}>
                <div className={style.avatar_content}>
                  <img src={user.avatar} className={style.avatar}/>
                  <span className={style.name_avatar}>{user.name}</span>
                </div>
                <ul className={style.menu_admin}>
                    <li className={style.menu_admin_pint}><a href="#" onClick={newNews}>Добавить новость</a></li>
                    <li className={style.menu_admin_pint}><a href="#" onClick={comeBack}>Вернуться к новостям</a></li>
                    <li className={style.menu_admin_pint}><a href="#" onClick={exit}>Выход</a></li>
                </ul>
            </div>
            {newss.map((news)=>(
            <div className={style.sticky_top} key={news.id}>
                
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Imges</th>
                            <th>Content</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{news.title}</td>
                            <td>{news.short_content}</td>
                            <td><img src={news.news_img} className={style.imges_content}/></td>
                            <td>{news.content}</td>
                            <td>{news.date}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={style.button_conteiner}>
                    <a href="#" className={style.button_redact}>Редактировать</a>
                    <a href="#" className={style.button_delete}>Удалить</a>
                </div>
                
            </div>
            ))}
        </div>
        } 
    </>
  )
}
