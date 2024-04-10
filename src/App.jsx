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
import { useEffect, useState } from "react";
import AuthProtected from "./routes/AuthProtected";
import ProfilePage from "./pages/Profile/ProfilePage";
import UpdateEvent from "./pages/UpdateEvent/UpdateEvent";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "./Hooks/useAxios";
import { userLoggedIn, userLoggedOut } from "./features/auth/authSlice";

function App() {
  const [isExpand, setIsExpand] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);

  const { Axios } = useAxios();

  // const getUserInfo = () => {
  //   Axios.get(`/user/get-user`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch(() => {
  //       console.log("error");
  //       // logOut();
  //     });
  // };

  // useEffect(() => {
  //   if (accessToken) {
  //     console.log("accessToken", accessToken);
  //     // getUserInfo();
  //     const getUserInfo = async () => {
  //       try {
  //         const res = await Axios.get(`/user/user`, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });
  //         console.log(res.data);
  //       } catch (error) {
  //         console.log("error");
  //         // logOut();
  //       }
  //     };
  //     getUserInfo();
  //   }
  // }, [accessToken]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await Axios.get(`/user/get-user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        dispatch(
          userLoggedIn({
            user: res.data?.data.user,
            accessToken: res.data?.data?.accessToken,
          })
        );
      } catch (error) {
        localStorage.removeItem("authUser");
        dispatch(userLoggedOut());
        // logOut();
      }
    };
    getUserInfo();
  }, []);

  return (
    <MyProvider.Provider value={{ isExpand, setIsExpand }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* <Route path="home-screen" element={<HomeScreen />} /> */}
          <Route
            path="create-event"
            element={
              <AuthProtected>
                <CreateEvent />
              </AuthProtected>
            }
          />
          <Route
            path="update-event/:id"
            element={
              <AuthProtected>
                <UpdateEvent />
              </AuthProtected>
            }
          />
          <Route
            path="profile-settings"
            element={
              <AuthProtected>
                <ProfileSetting />
              </AuthProtected>
            }
          />
          <Route
            path="my-events"
            element={
              <AuthProtected>
                <MyEvents />
              </AuthProtected>
            }
          />
          <Route
            path="invited-events"
            element={
              <AuthProtected>
                <InvitedEvents />
              </AuthProtected>
            }
          />
          <Route path="event-details/:id" element={<EventDetails />} />
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>
      </Routes>
    </MyProvider.Provider>
  );
}

export default App;
