import React, {Component} from 'react';
import {Routes, Route, useLocation, useNavigate, useParams} from 'react-router-dom';
import './App.css';
import {NavBar} from './Components/Navbar/NavBar';
import {Home} from './Components/Home/Home';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer, {HeaderContainerPropsType} from './Components/Header/HeaderContainer';
import {Login} from './Components/Login/Login';
import DialogContainer from './Components/Dialogs/DialogsContainer';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializedAppTC} from './redux/app-reducer';
import {AppRootStateType} from './redux/redux_store';
import {Preloader} from './Components/common/Preloader/Preloader';


function withRouter(Component: any) {   //need fixed
    function ComponentWithRouterProp(props: any) {  //need fixed  бы поставила ProfileContainerPropsType
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class App extends Component<AppContainerPropsType> {
    // const dialogs = useSelector<AppRootStateType, Array<DialogsType>>(state => state.dialogsPage.dialogs)

    componentDidMount() {
        this.props.initializedAppTC()
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }
        return (
            <>
                <div className="App">
                    <HeaderContainer />
                    <div className="container">
                        <div className="app__inner">
                            <NavBar/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="profile/:userId" element={<ProfileContainer />}/>
                                <Route path="profile" element={<ProfileContainer />}/>
                                <Route path="dialogs/*" element={<DialogContainer />} />
                                <Route path="news" element={<div>news</div>}/>
                                <Route path="music" element={<div>music</div>}/>
                                <Route path="settings" element={<div>settings</div>}/>
                                <Route path="users" element={<UsersContainer/>}/>
                                <Route path="*" element={<div>Route not match</div>}/>
                                <Route path="login" element={<Login />}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

// const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
//     return {
//         initialized: state.app.initialized
//     }
// }

const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializedAppTC}))(App)

//type
type AppContainerPropsType = MapDispatchToPropsType & mapStateToPropsType

type MapDispatchToPropsType = {
    initializedAppTC: () => void
}
type mapStateToPropsType = {
    initialized: boolean
}