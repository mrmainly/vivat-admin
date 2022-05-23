import axios from "axios";
import React from "react";
import cookie from "js-cookie";

const testURL = "http://127.0.0.1:8000/";
const publicURL = "http://xn----7sbbagaytx2c4ad.xn--p1ai/";

const api = (url, type) => {
    const token = cookie.get("jwttoken");
    if (type == "img") {
        if (token) {
            const instance = axios.create({
                baseURL: publicURL + url,
                headers: {
                    Authorization: "Token " + token,
                    "Content-Type": "multipart/form-data",
                },
            });
            return instance;
        } else {
            const instance = axios.create({
                baseURL: publicURL + url,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return instance;
        }
    } else {
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

    //getCity
    async getCity() {
        let result = await api(`api/v1/cities/`).get();
        return result;
    }

    async CreateCity(data) {
        let result = await api(`api/v1/cities/add/`).post(null, data);
        return result;
    }

    async PatchCity(data, id) {
        let result = await api(`api/v1/cities/${id}`).patch(null, data);
        return result;
    }

    //stocks
    async getPromotion() {
        let result = await api(`api/v1/promotion/`).get();
        return result;
    }

    //blog
    async getBlog(query, type) {
        let result = await api(
            `api/v1/blogs/${
                type
                    ? type == "query"
                        ? query
                            ? `?query=${query}`
                            : ""
                        : `?topic_query=${query}`
                    : ""
            }`
        ).get();
        return result;
    }

    async getBlogDetail(id) {
        let result = await api(`api/v1/blogs/${id}/`).get();
        return result;
    }

    async CreateBlog(data, convertedContent, img) {
        console.log("asd", img);
        let result = await api(`api/v1/blogs/`, "img").post(null, {
            name: data.name,
            topic: data.tag,
            description: convertedContent,
            image: img,
        });
        return result;
    }

    async getTopic() {
        let result = await api(`api/v1/blogs/topics/`).get();
        return result;
    }

    //orders
    async getAllOrders() {
        let result = await api(`api/v1/orders/`).get();
        return result;
    }
}

export default new API();
