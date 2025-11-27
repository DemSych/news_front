import React, {useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import style from './LKLayouts.module.css';
//import Loader from '../../pages/Loader/Loader';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function LKLayouts(props) {
    let navigate = useNavigate();
    //let [isLoading, setIsLoading] = useState(false);
    let [user, setUser] = useState([]);
  useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate("/auth");
        }
        else{
          // setIsLoading(true); 
          request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            if(!respons.data){
              sessionStorage.removeItem("token");
              setIsLoading(false);
              navigate("/auth");
            }
            else{
                setUser(respons.data);
               // setIsLoading(false);  
            }
            
          }})
        }
    
      },[]);
    
    function exit(){
        navigate("/dashboard");
        }
    function newNews(){
        navigate("/newNews");
    } 
    function main(){
        navigate("/LK");
    }
    return (
    <>
    
        {/* {(isLoading)?
                <Loader />
               :  */}
        <div className={style.simplebar_content}>
            <div className={style.avatar_content}>
               <img src={user.avatar} className={style.avatar}/>
                <span className={style.name_avatar}>{user.name}</span>
            </div>
            <ul className={style.menu_admin}>
                <li className={style.menu_admin_pint}><a href="#" onClick={main}>Главная</a></li>
                <li className={style.menu_admin_pint}><a href="#" onClick={newNews}>Добавить новость</a></li>
                <li className={style.menu_admin_pint}><a href="#" onClick={exit}>Выход</a></li>
            </ul>
        </div> 
        {/* }        */}
        {props.children}
    </>
  )
}
