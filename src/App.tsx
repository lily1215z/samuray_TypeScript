import React, {Component, ComponentType, Suspense} from 'react';
import {Routes, Route, useLocation, useNavigate, useParams, BrowserRouter, Navigate} from 'react-router-dom';
import './App.css';
import {NavBar} from './Components/Navbar/NavBar';
import UsersContainer from './Components/Users/UsersContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializedAppTC} from './redux/app-reducer';
import {AppRootStateType, store} from './redux/redux_store';
import {Preloader} from './Components/common/Preloader/Preloader';
import Login from './Components/Login/Login';
import {PageNotFound} from './Components/common/404/PageNotFound';

const DialogContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));


function withRouter<T>(Component: ComponentType<T>) {
    function ComponentWithRouterProp(props: T) {
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

    return ComponentWithRouterProp;
}

class App extends Component<AppContainerPropsType> {
    catchAllErrors = (promiseRejectionEvent: Event) => {
        alert('some error happened');
        console.error(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializedAppTC()
        window.addEventListener('unhandledrejection', this.catchAllErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllErrors)
    }

    render() {
        if (!this.props.initialized) {  //if app no initialized we will se  Preloader
            return <Preloader/>
        }
        return (
            <>
                <div className="App">
                    <HeaderContainer/>
                    <div className="container">
                        <div className="app__inner">
                            <NavBar/>
                            <Routes>
                                <Route path="/" element={<Navigate to="profile" /> }/>
                                {/*<Route path="/" element={<Home/>}/>*/}
                                {/*<Route path="profile/:userId" element={<ProfileContainer/>}/>*/}
                                {/*<Route path="profile" element={<ProfileContainer/>}/>*/}
                                {/*<Route path="dialogs/*" element={<DialogContainer />} />*/}

                                <Route path="profile/:userId" element={(
                                    <Suspense fallback={<Preloader/>}>
                                        <ProfileContainer/>
                                    </Suspense>)}/>

                                <Route path="profile" element={(
                                    <Suspense fallback={<Preloader/>}>
                                        <ProfileContainer/>
                                    </Suspense>)}/>

                                <Route path="dialogs/*" element={(
                                    <Suspense fallback={<div>Загрузка...</div>}>
                                        <DialogContainer/>
                                    </Suspense>)}/>

                                <Route path="news" element={<div>news</div>}/>
                                <Route path="music" element={<div>music</div>}/>
                                <Route path="settings" element={<div>settings</div>}/>
                                <Route path="users" element={<UsersContainer/>}/>
                                <Route path="login" element={<Login/>}/>

                                <Route path="/404" element={<PageNotFound/>}/>
                                <Route path="*" element={<Navigate to={'/404'}/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializedAppTC}))(App)

const SamuraiJSApp = () => {
    return <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}
export default SamuraiJSApp

//type
type AppContainerPropsType = MapDispatchToPropsType & mapStateToPropsType

type MapDispatchToPropsType = {
    initializedAppTC: () => void
}
type mapStateToPropsType = {
    initialized: boolean
}