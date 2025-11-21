import React, { useEffect, useState } from 'react';
import style from './newNews.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import ResultPages from '../resultPages/resultPages';
import LKLayouts from '../../Lauouts/LKLayouts/LKLayouts';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
let VITE_BACK_IMG = import.meta.env.VITE_BACK_IMG;
export default function newNews() {
    let navigate = useNavigate();
    let [selectedFile, setSelectedFile] = useState(null);
    let [isActive, setIsActive] = useState(false);
    let [isActiveMenu, setIsActiveMenu] = useState(false);
    let [result, setResult] = useState(null);
    const [loadNews, setLoadNews] = useState({userId: null,title: null, short_content: null, contents: null, name_img: null});
    useEffect(()=>{
       
          request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            
            loadNews.userId = respons.data.id;
            let copy = Object.assign({},loadNews );
            setLoadNews(copy);
          }})
        
    
      },[]);
    function loaderNews(evt){
       evt.preventDefault(); 
              const formData = new FormData();
              formData.append('myFile', selectedFile);
              request({method: 'POST', url: VITE_BACK_API + '/post-loader-images', data: formData, callback:(respons)=>{               
                      
                    loadNews.name_img = VITE_BACK_IMG + respons.data;
                    let copy = Object.assign({},loadNews );
                    setLoadNews(copy);   
                      request({method: 'POST', url: VITE_BACK_API + '/post-loader-news', data: loadNews, callback:(respons)=>{
                          setResult(respons.data);
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
      loadNews.contents = evt.target.value;
      let copy = Object.assign({},loadNews );
       setLoadNews(copy);
    }
    function onChangeFile(evt){
    selectedFile = evt.target.files[0];
    setSelectedFile(selectedFile);
    }
    
    function comeList(){
       window.location.reload();
        }
    return (
    <div >
      <LKLayouts>
          
          <div className={isActiveMenu ? style.isactive_block : style.active_menu}>
            <form action='' className={style.form_news} onSubmit={loaderNews}>
                <div >
                  <label className={style.label}>Заголовок</label>
                  <textarea onChange={onChangeTitle} className={style.title} name="title" defaultValue= ''></textarea>
                  {/* <input onChange={onChangeTitle} className={style.title} type="text"  name="title" id="exampleInputTitle"/> */}
                </div>
        
                <div >
                  <label className={style.label}>Краткое содержание</label>
                  <textarea onChange={onChangeShortContent} className={style.short_content} name="short_content" defaultValue= ''></textarea>
                  {/* <input onChange={onChangeShortContent} className={style.short_content} type="text" name="short_content	" id="exampleInputShortContent	" /> */}
                </div>
        
                <div>
                  <label className={style.label}>Текст</label>
                  <textarea onChange={onChangeContent} className={style.content} name="content" defaultValue= ''></textarea>
                 {/* <input onChange={onChangeContent} className={style.content} type="text" name="content" id="exampleСontent"/> */}
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
              <ResultPages 
                  result = {result}
                  functionResult = {comeList}
              />
          </div>
          </LKLayouts>
    </div>
  )
}
