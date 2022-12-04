import React, {useState} from 'react';
import paginatorStyle from './Paginator.module.css'
import {UsersContainerPropsType} from '../../Users/UsersContainer';
import cn from 'classnames'

type UsersPropsType = UsersContainerPropsType & {
    onPageChanged: (ageNumber: number) => void
    portionSize: number
}

export const Paginator: React.FC<UsersPropsType> = ({
                                                        totalUsersCount,
                                                        pageSize,
                                                        currentPage,
                                                        onPageChanged,
                                                        portionSize = 10
                                                    }) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    // useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);  // попробовать когда будет раб чтоб запоминала стр вроде бы
    const portionCount = Math.ceil(pageCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionNumber = portionNumber * portionSize;

    return (
        <div>

            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>PREV</button>}

            <span className={paginatorStyle.btn_box}>
               {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
                   .map((p) => {
                       return <span
                           key={p}
                           // className={currentPage === p ? paginatorStyle.selectedPage : ''}
                           className={cn({[paginatorStyle.selectedPage]: currentPage === p}, paginatorStyle.pageNumber)}
                           onClick={(e) => {
                               onPageChanged(p)
                           }}
                       >{p}</span>
                   })}
           </span>
            {portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}

        </div>
    )
};
