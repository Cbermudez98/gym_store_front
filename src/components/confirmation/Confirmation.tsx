import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";
import * as toast from "./../toast/Toast";
import { ParameterStore } from "../../domain/ParameterStore";
import { post } from "../../utils/Axios";

const Confirmation = () => {
    const { jwt } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${ParameterStore.URL_BACKEND}/user/confirmation/${jwt}`;
                await post(url, {});
                toast.success("Validate with success");
                
                setTimeout(() => {
                    return navigate("/");
                }, 4000);
            } catch (error) {
                setTimeout(() => {
                    toast.error("Error validation info");
                    return navigate("/");
                }, 4000);
            }
        };
        fetchData();
    }, []);
    return <Spinner/>
};

export default Confirmation;