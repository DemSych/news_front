import React, { useState } from 'react'
import style from './auth.module.css'
import { request } from '../../libs/request';
import { useNavigate } from 'react-router';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function auth() {
    let navigate = useNavigate();
    const [authUser, setauthUser] = useState({email: null, password: null});
    function onAuthrequest(evt){
        evt.preventDefault();
        //console.log(evt);
        request({method: 'POST', url: VITE_BACK_API + '/auth', data: authUser, callback:(respons)=>{
           if(respons.data.hasOwnProperty("token")){
                sessionStorage.setItem('token', respons.data.token);
                 navigate("/news");
           } 
           else{
             console.log(respons.data);
           }
        }});
        
    }
    function onChangeEmail(evt){
        //console.log(evt.target.value);
        authUser.email = evt.target.value;
        let copy = Object.assign({},authUser );
        setauthUser(copy);
    }
    function onChangePassword(evt){
        //console.log(evt.target.value);
        authUser.password = evt.target.value;
        let copy = Object.assign({},authUser );
        setauthUser(copy);
    }
  return (
    <>
        
                    <div className={style.container}>

                        <div >
                            <a href="#" >
                                <img src="#" alt="" />
                                <h1 >Авторизация</h1>
                            </a>
                        </div>

                        <form action='' onSubmit={onAuthrequest}>
                            <div >
                                <label  className={style.label}>Введите Email</label>
                                <input type="text" onChange={onChangeEmail} placeholder='email' nema="email" id="exampleInputEmail" className={style.form_control}/>
                            </div>

                            <div >
                                <label  className={style.label}>Введите пароль</label>
                                <input type="password" onChange={onChangePassword} placeholder='password' name="password" id="exampleInputPassword" className={style.form_control}/>
                            </div>

                            {/* <div>
                                <input type="checkbox" id="exampleCheck"/>
                                <label for="exampleCheck" className={style.label_check}>Запомнить меня</label>
                            </div> */}

                            <div >
                                <button className={style.btn}>Войти</button>
                            </div>

                            
                        </form>
                    </div>
                
           
    </>
  )
}