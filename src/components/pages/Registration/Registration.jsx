import React, { useState } from 'react'
import style from './Registration.module.css'
import { request } from '../../libs/request';
import { useNavigate } from 'react-router';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
let VITE_BACK_IMG = import.meta.env.VITE_BACK_IMG;
export default function Registration() {
    let navigate = useNavigate();
    let [result, setResult] = useState(null);
    let [selectedFile, setSelectedFile] = useState(null);
    const [registrationUser, setregistrationUser] = useState({name_user: null, email: null, password: null,  second_password: null, name_img: null});
    function onRegistrationrequest(evt){
        evt.preventDefault();
                const formData = new FormData();
                formData.append('myFile', selectedFile);
                request({method: 'POST', url: VITE_BACK_API + '/post-loader-avatar', data: formData, callback:(respons)=>{
                       if(respons.data != null){
                        registrationUser.name_img = VITE_BACK_IMG + respons.data;
                       }
                       else{
                        registrationUser.name_img = "Нет аватара";
                       }
                       let copy = Object.assign({},registrationUser );
                        setregistrationUser(copy); 
                       request({method: 'POST', url: VITE_BACK_API + '/registration', data: registrationUser, callback:(respons)=>{
                            // if(respons.data == true){
                            //     navigate("/auth");
                            // } 
                            // else{
                            //     setResult(respons.data);
                            // }
                            if(respons.data.hasOwnProperty("token")){
                                sessionStorage.setItem('token', respons.data.token);
                                navigate("/news");
                            } 
                            else{
                                setResult(respons.data);
                            }
                            }});
                    
                        }});
      
    }
    function onChangeName(evt){
        registrationUser.name_user = evt.target.value;
        let copy = Object.assign({},registrationUser );
        setregistrationUser(copy);
    }
    function onChangeEmail(evt){
        registrationUser.email = evt.target.value;
        let copy = Object.assign({},registrationUser );
        setregistrationUser(copy);
    }
    function onChangePassword(evt){
        registrationUser.password = evt.target.value;
        let copy = Object.assign({},registrationUser );
        setregistrationUser(copy);
    }
    function onChangeSecondPassword(evt){
        registrationUser.second_password = evt.target.value;
        let copy = Object.assign({},registrationUser );
        setregistrationUser(copy);
        
    }
    function onChangeFileAvatar(evt){
        selectedFile = evt.target.files[0];
        setSelectedFile(selectedFile);
    }
    function onChangeAuth(){
        navigate("/auth");
    }
  return (
    <>
        
                    <div className={style.container}>

                        <div >                            
                                <h1 className={style.registration_header}>Регистрация</h1>                           
                        </div>

                        <form action='' onSubmit={onRegistrationrequest}>
                            <div >
                                <label  className={style.label}>Введите Имя</label>
                                <input type="text" onChange={onChangeName} placeholder='Ваше имя' name="name_user" id="exampleInputNameUser" className={style.form_control}/>
                            </div>
                            <div >
                                <label  className={style.label}>Введите Email</label>
                                <input type="text" onChange={onChangeEmail} placeholder='email' name="email" id="exampleInputEmail" className={style.form_control}/>
                            </div>

                            <div >
                                <label  className={style.label}>Введите пароль</label>
                                <input type="password" onChange={onChangePassword} placeholder='password' name="password" id="exampleInputPassword" className={style.form_control}/>
                            </div>
                            <div >
                                <label  className={style.label}>Подтвердите пароль</label>
                                <input type="password" onChange={onChangeSecondPassword} placeholder='password' name="secondpassword" id="exampleInputSecondPassword" className={style.form_control}/>
                            </div>
                            <div >
                                <label  className={style.label}>Загрузите аватар</label>
                                <input onChange={onChangeFileAvatar} className={style.file_avatar} type="file" name="file_img"id="exampleInputFileAvatar"/>
                            </div>
                           <div>
                                <a className={style.label} href="#" onClick={onChangeAuth}>Перейти на авторизацию</a>
                           </div>

                            <div >
                                <button className={style.btn}>Продолжить</button>
                            </div>

                            <p className={style.result}>{result}</p>
                        </form>
                    </div>
                        
    </>
  )
}