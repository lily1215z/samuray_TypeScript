import React, {ComponentType} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {connect} from 'react-redux';

export function withRouter<T>(Component: ComponentType<T>) {

    const ComponentWithRouterProp = (props: any) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    const ConnectedWithRouterComponent = connect()(ComponentWithRouterProp)

    return ConnectedWithRouterComponent
}



