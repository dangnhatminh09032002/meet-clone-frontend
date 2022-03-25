import React, { useState, createContext } from "react";
import { BrowserRouter } from "react-router-dom";

const LayoutContainer = React.lazy(() =>
  import("./routes").then(({ Layout }) => ({ default: Layout }))
);

export const AppContext = createContext({
  isLogin: false,
  setIsLoginState: (val: boolean): void => {
    return;
  },
  user: {},
  setUser: (val: object): void => {
    return;
  },
});

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<object>({});

  const setIsLoginState = (val: boolean): void => {
    return setIsLogin(val);
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ isLogin, setIsLoginState, user, setUser }}>
        <React.Suspense fallback={<h1>Loading...</h1>}>
          {/* <SideBar></SideBar> */}
          <LayoutContainer />
          {/* </Header> */}

          {/* <Banner></Banner> */}
        </React.Suspense>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
