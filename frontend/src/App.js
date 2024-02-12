import "./App.css";


import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()

  return (
    <div id="page-outer">
      <div className="outer">

      </div>
      <div id="page">
        <div>
          <div id="heading-container" className="container mb-1 d-flex justify-content-between">
            <div>
              <h1 className="display-5 fw-medium mb-0">transfer<i>.zip</i></h1>
              <p className="text-secondary">Free, Fast, Encrypted</p>
            </div>
            <div>
              <button onClick={() => { navigate("/contacts") }} className="btn btn-outline-secondary m-1"><i className="bi bi-person-lines-fill"></i></button>
            </div>
          </div>
          <main className="d-flex flex-column">
            <div className="container d-flex justify-content-center flex-grow-1">
              <Outlet/>
            </div>
          </main>

          <div id="footer-container" className="container fs-6">
            <footer>
              <div className="row mt-4">
                <p className="mb-2">
                  Data sent with this service is end-to-end encrypted and transferred in realtime between
                  browsers. No file data, plaintext or encrypted, ever touches the server.
                </p>
              </div>
              <div className="d-flex flex-row justify-content-center mb-3">
                <a className="mx-1" href="/">Home</a>
                <a className="mx-1" href="/about">About</a>
                <a className="mx-1" href="/privacy-policy">Privacy Policy</a>
                <a className="mx-1" href="https://github.com/robinkarlberg/transfer.zip-web">View on GitHub</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <div className="outer">

      </div>
    </div>
  );
}

export default App;
