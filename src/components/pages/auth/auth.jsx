import React, { useState } from 'react'
import style from './auth.module.css'
import { request } from '../../libs/request';
import { useNavigate } from 'react-router';
import ResultPages from '../resultPages/resultPages';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function auth() {
    let navigate = useNavigate();
    let [isActive, setIsActive] = useState(false);
    let [result, setResult] = useState(null);
    const [authUser, setauthUser] = useState({email: null, password: null});
    function onAuthrequest(evt){
        evt.preventDefault();
        request({method: 'POST', url: VITE_BACK_API + '/auth', data: authUser, callback:(respons)=>{
           if(respons.data.hasOwnProperty("token")){
                sessionStorage.setItem('token', respons.data.token);
                navigate("/news");
           } 
           else{
            setResult(respons.data);
            setIsActive(!isActive);
           }
        }});
        
    }
    function onChangeEmail(evt){
        authUser.email = evt.target.value;
        let copy = Object.assign({},authUser );
        setauthUser(copy);
    }
    function onChangePassword(evt){
        authUser.password = evt.target.value;
        let copy = Object.assign({},authUser );
        setauthUser(copy);
    }
    function comeNews(){
        window.location.reload();
    }
    function onChangeReg(){
        navigate("/registration");
    }
  return (
    <>
        
                    <div className={isActive ? style.isactive_block : style.container}>

                        <div >                            
                                <h1 className={style.authHeader}>Авторизация</h1>                           
                        </div>

                        <form action='' onSubmit={onAuthrequest}>
                            <div >
                                <label  className={style.label}>Введите Email</label>
                                <input type="text" onChange={onChangeEmail} placeholder='email' name="email" id="exampleInputEmail" className={style.form_control}/>
                            </div>

                            <div >
                                <label  className={style.label}>Введите пароль</label>
                                <input type="password" onChange={onChangePassword} placeholder='password' name="password" id="exampleInputPassword" className={style.form_control}/>
                            </div>

                            {/* <div>
                                <input type="checkbox" id="exampleCheck"/>
                                <label for="exampleCheck" className={style.label_check}>Запомнить меня</label>
                            </div> */}
                            <div>
                                <span className={style.label}>Нет аккауна? Перейдите на страницу </span>
                                <a className={style.label} href="#" onClick={onChangeReg}>Регистрации</a>
                            </div>
                            <div >
                                <button className={style.btn}>Войти</button>
                            </div>

                            
                        </form>
                    </div>
                    <div className={isActive ? style.active_block : style.isactive_block}>
                                
                                 <ResultPages result = {result} functionResult = {comeNews}/>
                                
                    </div>
           
    </>
  )
}