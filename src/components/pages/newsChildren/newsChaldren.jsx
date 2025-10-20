import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { request } from '../../libs/request';
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function newsChaldren({ route }) {
    let navigate = useNavigate();
    let [newsChild, setNewsChild] = useState([]);
    let newsId  = route;
    console.log(newsId);
  return (
    <div>newsChaldren</div>
  )
}
