import React, { useEffect, useState } from 'react';
import style from './newNews.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
let VITE_BACK_IMG = import.meta.env.VITE_BACK_IMG;
export default function newNews() {
    let navigate = useNavigate();
    let [selectedFile, setSelectedFile] = useState(null);
    let [isActive, setIsActive] = useState(false);
    let [isActiveMenu, setIsActiveMenu] = useState(false);
    const [loadNews, setLoadNews] = useState({userId: null,title: null, short_content: null, content: null, name_img: null});
    useEffect(()=>{
       
          request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            
            loadNews.userId = respons.data.id;
            let copy = Object.assign({},loadNews );
            setLoadNews(copy);
          }})
        
    
      },[]);
    function loaderNews(evt){
      const formData = new FormData();
      formData.append('myFile', selectedFile); 
    
      evt.preventDefault();
      request({method: 'POST', url: VITE_BACK_API + '/post-loader-images', data: formData, callback:(respons)=>{
               
                loadNews.name_img = VITE_BACK_IMG + respons.data;
                let copy = Object.assign({},loadNews );
                setLoadNews(copy);
                request({method: 'POST', url: VITE_BACK_API + '/post-loader-news', data: loadNews, callback:(respons)=>{
                   
                  setIsActive(!isActive);
                  setIsActiveMenu(!isActiveMenu);
              }});
              }});
    }
    function onChangeTitle(evt) {
       loadNews.title = evt.target.value;
       let copy = Object.assign({},loadNews );
       setLoadNews(copy);
    }
    function onChangeShortContent(evt){
      loadNews.short_content = evt.target.value;
      let copy = Object.assign({},loadNews );
       setLoadNews(copy);
    }
    function onChangeContent(evt){
      loadNews.content = evt.target.value;
      let copy = Object.assign({},loadNews );
       setLoadNews(copy);
    }
    function onChangeFile(evt){
    selectedFile = evt.target.files[0]
     
     setSelectedFile(selectedFile);
      
    }
    function comeLK(){
        navigate("/LK");
        }
    function comeBack(){
        navigate("/news");
        }
    function comeList(){
       window.location.reload();
        console.log(1234);
        }
    return (
    <div >
          <div className={style.simplebar_content}>
                          
              <ul className={style.menu_admin}>
                  <li className={style.menu_admin_pint}><a href="#" onClick={comeBack}>Вернуться к новостям</a></li>
                  <li className={style.menu_admin_pint}><a href="#" onClick={comeLK}>Вернуться в ЛК</a></li>
              </ul>
          </div>
          <div className={isActiveMenu ? style.isactive_block : style.active_menu}>
            <form action='' className={style.form_news} onSubmit={loaderNews}>
                <div >
                  <label className={style.label}>Оглавление</label>
                  <input onChange={onChangeTitle} className={style.title} type="text"  name="title" id="exampleInputTitle"/>
                </div>
        
                <div >
                  <label className={style.label}>Описание</label>
                  <input onChange={onChangeShortContent} className={style.short_content} type="text" name="short_content	" id="exampleInputShortContent	" />
                </div>
        
                <div>
                  <label className={style.label}>Контент</label>
                 <input onChange={onChangeContent} className={style.content} type="text" name="content" id="exampleСontent"/>
                </div>
                <div > 
                  <label className={style.label}>Выберите изображение</label>
                  <input onChange={onChangeFile} className={style.file} type="file" name="file_img" id="exampleFile"/>
                </div>
                <div >
                  <button className={style.btn}>Создать</button>
              
                </div>                              
            </form>
          </div>
          <div className={isActive ? style.active_block : style.isactive_block}>
             <h3 className={style.successfully}>Новость успешно добавлена</h3>
             <a className={style.btn_successfully} href="#" onClick={comeList}>Добавить следующую</a>
          </div>
    </div>
  )
}
