import React,{useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import style from './users.module.css';
import DashboardLayouts from '../../Lauouts/DashboardLayouts/DashboardLayouts';
import Loader from '../Loader/Loader';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function users() {
let navigate = useNavigate();
  let [listUsers, setlistUsers] = useState([]);
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
        
        request({method:"POST", url: VITE_BACK_API + "/post-faile-users", callback: (respons)=>{
            console.log(respons.data);
           setlistUsers(respons.data);
           setIsLoading(false);
          }
        });     
      }})
    }

  },[]);
  
function blockedUser(usersId, status){
      if(status == 'admin' && usersId != user.id){
            request({method:"POST", url: VITE_BACK_API + "/post-faile-blockedUser/"+ usersId, callback: (respons)=>{
                        window.location.reload();
                        }
                      });
       } 
    } 
function activeUser(usersId, status){
         if(status != 'admin'){
            request({method:"POST", url: VITE_BACK_API + "/post-faile-activeUser/"+ usersId, callback: (respons)=>{
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
                        <h4 className={style.text_slate}>Users</h4>

                    </div>
                </div>
                            <div className={style.sticky_top} >
                                
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={style.user_avatar}> Avatar</th>
                                            <th className={style.user_name}>Name</th>
                                            <th className={style.user_email}>Email</th>
                                            <th className={style.user_status}>Status</th>
                                            <th className={style.user_control}>Сontrol</th>
                                        </tr>
                                    </thead>
                                    {listUsers.map((users)=>(
                                    <tbody key={users.id}>
                                        <tr>
                                            <td className={style.user_avatar}>
                                                {users.avatar && <img src = {users.avatar} alt="изображение" className={style.image_user}/>}
                                            </td>
                                            <td className={style.user_name}>{users.name}</td>
                                            <td className={style.user_email}>{users.email}</td>
                                            <td className={style.user_status}>{users.admin}</td>
                                            <td className={style.user_control}>
                                                <div className={style.button_conteiner}>
                                                    <a href="#" className={style.button_redact} onClick={() => blockedUser(users.id, users.admin)}>Закрыть доступ</a>
                                                    <a href="#" className={style.button_delete} onClick={() => activeUser(users.id, users.admin)}>Открыть доступ</a>
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
