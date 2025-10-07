import React from 'react'
import style from './auth.module.css'
export default function auth() {
  return (
    <>
        
                    <div className={style.container}>

                        <div >
                            <a href="#" >
                                <img src="#" alt="" />
                                <h1 >Авторизация</h1>
                            </a>
                        </div>

                        <form>
                            <div >
                                <label for="exampleInputEmail" className={style.label}>Введите Email</label>
                                <input type="text"  id="exampleInputEmail" className={style.form_control}/>
                            </div>

                            <div >
                                <label for="exampleInputPassword" className={style.label}>Введите пароль</label>
                                <input type="password"  id="exampleInputPassword" className={style.form_control}/>
                            </div>

                            {/* <div>
                                <input type="checkbox" id="exampleCheck"/>
                                <label for="exampleCheck" className={style.label_check}>Запомнить меня</label>
                            </div> */}

                            <div >
                                <button type="button" className={style.btn}>Войти</button>
                            </div>

                            
                        </form>
                    </div>
                
           
    </>
  )
}