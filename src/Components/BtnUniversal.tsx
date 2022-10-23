import React from 'react';

type BtnUniversalType = {
    className: string
    onClick: () => void
    title: string
}
export const BtnUniversal: React.FC<BtnUniversalType> = ({className, onClick, title}) => {
    return (
        <button
            className={className}
            onClick={onClick}
        >{title}</button>
    );
};

