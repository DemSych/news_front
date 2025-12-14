
import React,{useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../libs/request';
import style from './DashboardLayouts.module.css';
import { FaHome } from "react-icons/fa";
import { IoMan } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { SiGoogleforms } from "react-icons/si";
import { LiaMapSolid } from "react-icons/lia";
import { MdOutlineTableChart } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
export default function DashboardLayouts() {
    let navigate = useNavigate();
    function comeBack(){
        navigate("/news");
        }
    function StarterPages(){
    navigate("/dashboard");
    } 
    function onUsers(){
    navigate("/users");
    } 
    function onLK(){
        navigate('/LK');      
    }
  return (
    <>
        <div className={style.menu_open}>
                                <IoMenu />
        </div>
        <div id="app-menu"
                    className={style.app_menu}>
                    <div className={style.logo_main}>
                        <a href="#">
                            <img src="http://127.0.0.1:8000/storage/imges/news/logo-dark.png" alt="logo" className={style.logo_img} />
                            
                        </a>
                    </div>
        
                    <div className={style.left_menu} data-simplebar>
                        <ul className={style.admin_menu}>
                            <li className={style.menu_item}>
                                <a className={style.item_level}
                                    href="#" onClick={StarterPages}>
                                    <span className={style.menu_icon}><FaHome /></span>
                                    <span className={style.menu_text}>Starter Pages</span>
                                </a>
                            </li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level} onClick={onUsers}>
                                    <span className={style.menu_icon}><IoMan /></span>
                                    <span className={style.menu_text}> Users </span>
                                </a>
                            </li>
        
                            <li className={style.elements}>Elements</li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level} onClick={onLK}>
                                    <span className={style.menu_icon}><RxDashboard /></span>
                                    <span className={style.menu_text}> LK </span>
                                </a>
                            </li>
        
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level}>
                                    <span className={style.menu_icon}><SiGoogleforms /></span>
                                    <span className={style.menu_text}> Forms </span>
                        
                                </a>
                            </li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level}>
                                    <span className={style.menu_icon}><LiaMapSolid /></span>
                                    <span className={style.menu_text}> Maps </span>
                                </a>
                            </li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level}>
                                    <span className={style.menu_icon}><MdOutlineTableChart /></span>
                                    <span className={style.menu_text}> Tables </span>
                                </a>
                            </li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level}>
                                    <span className={style.menu_icon}><FaChartSimple /></span>
                                    <span className={style.menu_text}> Chart </span>
                                </a>
                            </li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level}>
                                    <span className={style.menu_icon}><FaPalette /></span>
                                    <span className={style.menu_text}> Icons </span>
                                </a>
                            </li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level}>
                                    <span className={style.menu_icon}><IoShareSocialOutline /></span>
                                    <span className={style.menu_text}> Level </span>
                                </a>
        
                            </li>
        
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level}>
                                    <span className={style.menu_icon}><MdOutlineVerified /></span>
                                   
                                    <span className={style.menu_text}> Badge Items </span>
                                   
                                </a>
                            </li>
                            <li className={style.menu_item}>
                                <a href="#"
                                    className={style.item_level} onClick={comeBack}>
                                    <span className={style.menu_text}> Exit </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
    </>
  )
}
