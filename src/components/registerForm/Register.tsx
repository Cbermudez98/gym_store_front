import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { IUserRegister } from "../../domain/IUserRegister";
import { ParameterStore } from "../../domain/ParameterStore";
import * as toast from "../toast/Toast";
import { post } from "../../utils/Axios";
import Spinner from "../spinner/Spinner";

const Register = (): JSX.Element => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate();
    const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser: IUserRegister = {
            name,
            last_name: lastName,
            email,
            password,
            username
        };
        for (const prop in newUser) {
            if(!newUser[prop]) {
                return toast.error("All parameters are required")
            }
        }
        try {
            setSpinner(true);
            const url = `${ParameterStore.URL_BACKEND}/user`;
            await post(url, newUser);
            toast.success("Register with success");
            return navigate("/");
        } catch (error) {
            setSpinner(false);
            const err = error as AxiosError;
            if (err?.request?.status === 409) {
                return toast.error("Email or username already exists");
            }
            toast.error(err.message);
        }
    };
    return (
        <>
            <form onSubmit={onHandleSubmit}>
                <div className="bm-3">
                    <h3>Register form</h3>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" aria-describedby="nameHelp"/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" aria-describedby="lastNameHelp"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" aria-describedby="emailHelp"/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" aria-describedby="passwordHelp"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} id="username" aria-describedby="usernameHelp"/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <input type="submit" className="btn btn-primary" id="submit" aria-describedby="usernameHelp"/>
                        </div>
                    </div>
                    {spinner && <Spinner/> }
                </div>
            </form>
        </>
    );
};

export default Register;