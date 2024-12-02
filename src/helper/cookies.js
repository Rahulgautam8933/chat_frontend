import { useCallback } from "react";
import Cookies from 'js-cookie';

export default function useCookie() {

    const setCookie = useCallback(function (cname, cvalue, exdays = 30) {
        Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
        return true;
    }, []);


    const getCookie = useCallback(function (cname) {
        return Cookies.get(cname);
    }, []);


    return { setCookie, getCookie };

};


export const deleteCookie = function (cname) {
    document.cookie = `${cname}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    return true;
};