import React from 'react'
import style from './dashboard.module.css'
import avatar from '../imges/avatar-1.jpg'
import imges from'../imges/img-1.jpg'
export default function admin() {
  return (
    <>
        <div className={style.continer}>
            <div className={style.simplebar_content}>
                <div className={style.avatar_content}>
                  <img src={avatar} className={style.avatar}/>
                  <span className={style.name_avatar}>Иванов Иван</span>
                </div>
                <ul className={style.menu_admin}>
                    <li className={style.menu_admin_pint}><a>Главная</a></li>
                    <li className={style.menu_admin_pint}><a>Информационная панель</a></li>
                    <li className={style.menu_admin_pint}><a>Добавить новость</a></li>
                </ul>
            </div>
            <div className={style.sticky_top}>
                <table>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Imges</td>
                        <td>Content</td>
                        <td>Date</td>
                    </tr>
                    <tr>
                        <td>Новые настройки в Трекере, выход Документов из беты и другие изменения в Яндекс 360 за сентябрь</td>
                        <td>Обновили виджеты, расширили настройки доступов и улучшили интерфейсы для удобства сотрудников.</td>
                        <td><img src={imges} className={style.imges_content}/></td>
                        <td>Новые функции в Документах
                            Настроили работу с изображениями и таблицами в Документах. Теперь сотрудники могут вставлять их в текст, а после совместно редактировать. Удобно, если нужно добавить таблицу с расписанием в планы мероприятий или с данными о расходах — в отчёты.
                            Подключили комментарии. Можно участвовать в обсуждениях прямо в документе: оставлять комментарии, отвечать на них и создавать цепочки. Если отметить комментарий как решённый — он исчезнет с рабочей области, но останется в общем списке на боковой панели. Удобно, если нужно вспомнить, о чём уже говорили с коллегой.
                            Добавили офлайн-режим. Все изменения, которые пользователи вносят в офлайн-режиме, сохраняются на устройстве и автоматически синхронизируются с облаком после восстановления соединения. Теперь можно безопасно работать с важными документами даже без интернета.
                            Внедрили функцию поиска и замены. Поиск в системе учитывает регистр, а функция замены позволяет обновлять текст сразу во всём документе.</td>
                        <td>12.08.2025</td>
                    </tr>
                </table>
            </div>
        </div> 
    </>
  )
}
