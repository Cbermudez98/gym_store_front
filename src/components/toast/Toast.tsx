import { toast } from "react-toastify"

export const info = (msg: string) => {
    toast.info(msg);
}

export const want = (msg: string) => {
    toast.warn(msg);
};

export const error = (msg: string) => {
    toast.error(msg);
};

export const success = (msg: string) => {
    toast.success(msg);
};