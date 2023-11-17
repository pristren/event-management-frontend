import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import EventDetails from "./pages/EventDetails/EventDetails";
import Home from "./pages/Home/Home";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import InvitedEvents from "./pages/InvitedEvent/InvitedEvents";
import MyEvents from "./pages/MyEvents/MyEvents";
import ProfileSetting from "./pages/Profile/ProfileSetting";
import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/SignUp/SignUp";
import Layout from "./pages/Layouts/Layout";
import MyProvider from "./Provider/Provider";
import { useState } from "react";

function App() {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <MyProvider.Provider value={{ isExpand, setIsExpand }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="home-screen" element={<HomeScreen />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="profile-settings" element={<ProfileSetting />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="invited-events" element={<InvitedEvents />} />
          <Route path="event-details" element={<EventDetails />} />
        </Route>
      </Routes>
    </MyProvider.Provider>
  );
}

export default App;
