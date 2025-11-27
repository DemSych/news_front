import React, { useEffect, useState } from 'react';
import style from './newsRedact.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ResultPages from '../resultPages/resultPages';
import LKLayouts from '../../Lauouts/LKLayouts/LKLayouts';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
let VITE_BACK_IMG = import.meta.env.VITE_BACK_IMG;
export default function newsRedact() {
    let navigate = useNavigate();
    let [selectedFile, setSelectedFile] = useState(null);
    let [result, setResult] = useState(null);
    let [isActive, setIsActive] = useState(false);
    let [isActiveMenu, setIsActiveMenu] = useState(false);
    let { id } = useParams();
    let [newsChild, setNewsChild] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadNews, setLoadNews] = useState({id: id,title: null, short_content: null, contents: null, name_img: null});
    useEffect(()=>{
       
          request({method:"POST", url: VITE_BACK_API + "/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (respons)=>{
            
            loadNews.userId = respons.data.id;
            let copy = Object.assign({},loadNews );
            setLoadNews(copy);
          }})
        
    
      },[]);
    useEffect(()=>{
          setIsLoading(true);
           request({method:"GET", url: VITE_BACK_API + "/get-faile-newsChild/"+ id, callback: (respons)=>{
                 setNewsChild(respons.data);
                 setIsLoading(false);
                }
              });
           
      },[]);
    function redactNews(evt){
      evt.preventDefault();
       
         const formData = new FormData();
        formData.append('myFile', selectedFile);
        request({method: 'POST', url: VITE_BACK_API + '/post-loader-images', data: formData, callback:(respons)=>{               
                loadNews.name_img = VITE_BACK_IMG + respons.data;
                let copy = Object.assign({},loadNews );
                setLoadNews(copy);  
                request({method: 'POST', url: VITE_BACK_API + '/post-redact-news', data: loadNews, callback:(respons)=>{
                    setResult(respons.data);
                    setIsActive(!isActive);
                  setIsActiveMenu(!isActiveMenu);
                  
                }});  
              }});
    }
    function onChangeTitle(evt) {
       loadNews.title = evt.target.value;
       console.log(evt.target.value);
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
     function comeLK(){
        navigate("/LK");
        }
   
    return (
    <>
    <h2 className={style.redact_pages}>Редактирование</h2>
    
         {(isLoading)?
                <Loader />
               : 
    <LKLayouts>           
    <div >
          <div className={isActiveMenu ? style.isactive_block : style.active_menu}>
            <form action='' className={style.form_news} onSubmit={redactNews}>
                <div >
                  <label className={style.label}>Заголовок</label>
                  <textarea onChange={onChangeTitle} className={style.title} name="title" defaultValue= {newsChild.title}></textarea>
                </div>
        
                <div >
                  <label className={style.label}>Краткое содержание</label>
                  <textarea onChange={onChangeShortContent} className={style.short_content} name="short_content" defaultValue= {newsChild.short_content}></textarea>
                </div>
        
                <div>
                  <label className={style.label}>Текст</label>
                  <textarea onChange={onChangeContent} className={style.content} name="content" defaultValue= {newsChild.content}></textarea>
                </div>
                <div > 
                  <img src = {newsChild.news_img} alt="изображение" className={style.image_news}/>
                  <label className={style.label}>Выберите изображение для замены</label>
                  <input onChange={onChangeFile} className={style.file} type="file" name="file_img" id="exampleFile" />
                </div>

                <div >
                  <button className={style.btn}>Редактировать</button>
              
                </div>                              
            </form>
          </div>
          <div className={isActive ? style.active_block : style.isactive_block}>
            
             <ResultPages 
             result = {result}
             functionResult = {comeLK}
             
             />
          </div>
    </div>
    </LKLayouts>
     }
     
    </>
  )
}
