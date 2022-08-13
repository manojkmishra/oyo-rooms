import React from 'react'
import Login from './components/user/Login'
import NavBar from './components/NavBar'
import Loading from './components/Loading';
import Notification from './components/Notification';
import BottomNav from './components/BottomNav';
import Room from './components/rooms/Room';
const App = () => {
  //return (  <div>App</div>  )
  //return (<NavBar/>)
  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <NavBar />
      <BottomNav />
      <Room/>
    </>
  );
}

export default App;