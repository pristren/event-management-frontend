import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Home from "./pages/Home/Home";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import ProfileSetting from "./pages/Profile/ProfileSetting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-screen" element={<HomeScreen />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/profile-settings" element={<ProfileSetting />} />
      </Routes>
    </>
  );
}

export default App;
