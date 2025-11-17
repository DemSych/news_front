import React,{ useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { request } from '../../libs/request';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function deleteNews() {
  let { id } = useParams();
  let navigate = useNavigate();
  useEffect(()=>{
        request({method:"POST", url: VITE_BACK_API + "/post-delete-news/" + id, callback: (respons)=>{
                            navigate("/LK");
                          }
                        });
         
         },[]);  
  return (
    <div></div>
  )
}
