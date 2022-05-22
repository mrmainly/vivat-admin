import axios from "axios";
import React from "react";
import cookie from "js-cookie";

const testURL = "http://127.0.0.1:8000/";
const publicURL = "http://xn----7sbbagaytx2c4ad.xn--p1ai/";

const api = (url) => {
    const token = cookie.get("jwttoken");
    if (token) {
        const instance = axios.create({
            baseURL: publicURL + url,
            headers: {
                Authorization: "Token " + token,
                "Content-Type": "application/json",
            },
        });
        return instance;
    } else {
        const instance = axios.create({
            baseURL: publicURL + url,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return instance;
    }
};

class API {
    //sign-in
    getToken({ username, password }) {
        const result = api("api/v1/users/login/").post(null, {
            username: username,
            password: password,
        });
        return result;
    }

    //verifi code
    sendVerifyCode(data) {
        const result = api("api/v1/users/code/2/verify/").post(null, data);
        return result;
    }

    //forgot
    sendPhoneMailForgotPassword(data, type) {
        const result = api(
            type == "phone"
                ? `api/v1/users/reset_phone/`
                : "api/v1/users/reset_email/"
        ).post(
            null,
            type == "phone" ? { phone: data.phone } : { email: data.email }
        );
        return result;
    }

    reset_password(data) {
        return api("api/v1/users/reset_password/").post(null, {
            code: data.code,
            password: data.password,
        });
    }
}

export default new API();
