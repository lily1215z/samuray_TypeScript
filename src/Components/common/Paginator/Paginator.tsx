import React, {useState} from 'react';
import paginatorStyle from './Paginator.module.scss'
import {UsersContainerPropsType} from '../../Users/UsersContainer';
import cn from 'classnames'
import swordNext from '../../../images/swordNext.png';
import swordPrev from '../../../images/swordPrev.png';

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
        <div className={paginatorStyle.block}>

            {portionNumber > 1 &&
                <div
                    className={paginatorStyle.btn}
                    onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>  <img
                    src={swordPrev}
                    width='100'
                    alt="logo"/></div>}

            <div className={paginatorStyle.paginator_box}>
               {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
                   .map((p) => {
                       return <span
                           key={p}
                           className={cn({[paginatorStyle.selectedPage]: currentPage === p}, paginatorStyle.pageNumber)}
                           onClick={() => {
                               onPageChanged(p)
                           }}
                       >{p}</span>
                   })}
           </div>
            {portionCount > portionNumber &&
                <div
                    className={paginatorStyle.btn}
                    onClick={() => setPortionNumber(portionNumber + 1)}>
                    <img
                        src={swordNext}
                        width='100'
                        alt="logo"/></div>}

        </div>
    )
};
