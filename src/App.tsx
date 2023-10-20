import { useState } from 'react'
import './App.css'

import * as toast from './components/toast/Toast';
import { post } from './utils/Axios';
import { ParameterStore } from './domain/ParameterStore';

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const login = {
      username,
      password
    };

    for (const prop in login) {
      if (!login[prop]) {
        return toast.error("All fields are required");
      }
    }

    try {
      const logged = await post<{token: string}, typeof login>(`${ParameterStore.URL_BACKEND}/user/login`, login);
      localStorage.setItem("Token", `Bearer ${logged.token}`);
      return toast.success("Login with success");
    } catch (error) {
      return toast.error("Email and password not matching");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} id="userName" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3">
          <a href={"/register"} className="link-primary">Register</a>
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
    </>
  )
}

export default App
