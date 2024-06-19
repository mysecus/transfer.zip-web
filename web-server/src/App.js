import { useContext, useEffect, useState } from "react";
// import "./App.css";
// import "./extra.css";
import logo from "./img/transfer-zip-logotext-cropped.png"

import { Link, Outlet, useNavigate } from "react-router-dom";
import { ApplicationContext, ApplicationProvider } from "./providers/ApplicationProvider";
import IntentDescription from "./components/IntentDescription"
import AddContactModal from "./components/modals/AddContactModal";
import Adsense from "./components/Adsense";
import SideBar from "./components/app/SideBar";
import { AuthProvider } from "./providers/AuthProvider";
import Header from "./components/app/Header";

function App() {
  const { setShowContacts } = useContext(ApplicationContext)
  const navigate = useNavigate()

  const isInfoPage = window.location.href.indexOf("privacy-policy") + window.location.href.indexOf("about") > -1

  useEffect(() => {
    if (window.location.hash) {  // User has been sent a link, assuming action be taken
      const hashList = window.location.hash.slice(1).split(",")

      if (hashList.length != 3) {
        throw "The URL parameters are malformed. Did you copy the URL correctly?"
      }

      const [key_b, recipientId, directionChar] = hashList
      // setHashList(hashList)
      // setTransferDirection(directionChar)
      const state = {
        key: key_b,
        remoteSessionId: recipientId,
        transferDirection: directionChar
      }

      window.location.hash = ""
      if (directionChar == "R") {
        navigate("/progress", {
          state
        })
      }
      else if (directionChar == "S") {
        navigate("/upload-on-behalf", {
          state
        })
      }
    }
  }, [])

  const mobile = document.body.clientWidth < 576

  return (
    <div className={"App bg-dark-subtle min-vh-100 d-flex flex-column flex-md-row"}>
      <Header className="d-md-none" />
      <SideBar className="d-none d-md-flex" />
      <div className="d-flex flex-row flex-grow-0 flex-sm-grow-1">
        <Outlet />
      </div>
      {/* <div className="w-100">
        <div className="m-auto" style={{ maxWidth: "1500px" }}>
        </div>
      </div> */}
    </div>
  );
}

export default App;
