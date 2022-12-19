import React, {useState} from 'react';
import app from '../../App.module.scss';

type CatchAllErrorsType = {}

export const CatchAllErrors:React.FC<CatchAllErrorsType> = () => {
    const [allError, setAllError] = useState(true);

    setTimeout(() => {
        setAllError(false)
    }, 4000);

    return (<>
        {allError &&
            <div className={app.all_error}>
                Oops, something went wrong...
            </div>
        }
    </>

    );
};

