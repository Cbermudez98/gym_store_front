import axios from "axios";

export const get = (url: string) => {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(({ data }) => resolve(data))
            .catch((error) => reject(error));
    });
};

export const post = <T, P>(url: string, data: P): Promise<T> => {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(({ data }) => resolve(data as T))
            .catch((error) => reject(error));
    });
};