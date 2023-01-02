import React, {Component, Suspense} from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import app from './App.module.scss';
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
import {withRouter} from './hoc/withRouter';
import {CatchErrors} from './Components/common/CatchErrors';

const DialogContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

class App extends Component<AppContainerPropsType> {
    componentDidMount() {
        this.props.initializedAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        // if(this.props.error !== null) {
        //     return  <CatchErrors />
        // }

        return (
            <>
                {this.props.error !== null && <CatchErrors />}

                <div className={app.container}>
                    <HeaderContainer/>
                    <div className={app.container}>

                        <div className={app.app_inner}>
                            <NavBar/>
                            <Routes>

                                <Route path="/" element={<Navigate to="profile"/>}/>

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

                                <Route path="404" element={<PageNotFound/>}/>
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
        initialized: state.app.initialized,
        error: state.app.error,
        preloader: state.app.preloader
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
    error: string | null
    preloader: boolean
}