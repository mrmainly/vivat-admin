import axios from "axios";
import React from "react";
import cookie from "js-cookie";

const testURL = "http://127.0.0.1:8000/";
const publicURL = "https://xn----7sbbagaytx2c4ad.xn--p1ai/";

const api = (url, type) => {
    const token = cookie.get("jwttoken");
    if (type === "img") {
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
        const result = api("api/v1/users/admin/login/").post(null, {
            username: username,
            password: password,
        });
        return result;
    }

    //verifi code
    sendVerifyCode(data) {
        const result = api("api/v1/users/code/2/verify/").post(
            null,
            data
        );
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
            type == "phone"
                ? { phone: data.phone }
                : { email: data.email }
        );
        return result;
    }

    reset_password(data) {
        return api("api/v1/users/reset_password/").post(null, {
            code: data.code,
            password: data.password,
        });
    }

    //city
    async getCity() {
        let result = await api(`api/v1/cities/`).get();
        return result;
    }

    async CreateCity(data) {
        let result = await api(`api/v1/cities/`).post(null, data);
        return result;
    }

    async PatchCity(data, id) {
        let result = await api(`api/v1/cities/${id}`).patch(null, {
            name: data,
        });
        return result;
    }

    async getCityId(id) {
        let result = await api(`api/v1/cities/${id}`).get();
        return result;
    }

    async deleteCity(id) {
        let result = await api(`api/v1/cities/${id}`).delete(null);
        return result;
    }

    //stocks
    async getPromotion(page) {
        let result = await api(
            `api/v1/promotion/?page=${page}`
        ).get();
        return result;
    }

    async getPromotionId(id) {
        let result = await api(`api/v1/promotion/${id}`).get();
        return result;
    }

    async CreatePromotion(data) {
        let result = await api(`api/v1/promotion/`, "img").post(
            null,
            data
        );
        return result;
    }

    async PromotionGoodsDelete(id, data) {
        console.log(data);
        let result = await api(`api/v1/promotion/goods/${id}`).delete(
            null,
            {
                data: data,
            }
        );
        return result;
    }

    async PromotionPatch(data, id) {
        let result = await api(`api/v1/promotion/${id}`, "img").patch(
            null,
            data
        );
        return result;
    }

    async addedStocksGoodsId(id, data) {
        let result = await api(`api/v1/promotion/goods/${id}`).post(
            null,
            data
        );
        return result;
    }

    async promotionDelete(id) {
        let result = await api(`api/v1/promotion/${id}`).delete(null);
        return result;
    }

    //blog
    async getBlog(query, type, page, ordering) {
        let result = await api(
            `api/v1/blogs/?page=${page}${
                type
                    ? type === "query"
                        ? query
                            ? `&query=${query}`
                            : ""
                        : `&tags_query=${query}`
                    : ""
            }`
        ).get();
        return result;
    }

    async getBlogDetail(id) {
        let result = await api(`api/v1/blogs/${id}/`).get();
        return result;
    }

    async deleteBlog(id) {
        let result = await api(`api/v1/blogs/${id}/`).delete(null);
        return result;
    }

    async CreateBlog(data, convertedContent, img) {
        console.log("asd", img);
        let result = await api(`api/v1/blogs/`, "img").post(null, {
            name: data.name,
            tags: data.tag,
            description: convertedContent,
            image: img,
            preview: data.preview,
        });
        return result;
    }

    async getTopic(currentPage) {
        let result = await api(
            `api/v1/blogs/tags/?page=${currentPage}`
        ).get();
        return result;
    }

    async patchBlog(id, data) {
        let result = await api(`api/v1/blogs/${id}/`, "img").patch(
            null,
            data
        );
        return result;
    }

    //orders
    async getAllOrders(
        status,
        page,
        ordering,
        paymantAmountMin,
        paymantAmountMax
    ) {
        let result = await api(
            `api/v1/orders/?page=${page}&orderStatus=${status}&ordering=${ordering}&paymentAmount_min=${paymantAmountMin}&paymentAmount_max=${paymantAmountMax}`
        ).get();
        return result;
    }

    async getOrderId(id) {
        let result = await api(`api/v1/orders/${id}/`).get();
        return result;
    }

    async getStatuses() {
        let result = await api(`api/v1/orders/statuses/`).get();
        return result;
    }

    async cancelOrderStatus(id) {
        let result = await api(`api/v1/orders/cancel/${id}/`).put(
            null
        );
        return result;
    }

    async patchOrderStatus(status, id) {
        let result = await api(
            `api/v1/orders/change_status/${id}/`
        ).patch(null, {
            orderStatus: status,
        });
        return result;
    }

    //users
    async getUsers(page, ordering, role, phone, fullName) {
        let result = await api(
            `api/v1/users/admin/users/?page=${page}&ordering=${ordering}&role=${role}&phone=${phone}&full_name=${fullName}`
        ).get();
        return result;
    }

    async putUsers(id, active) {
        let result = await api(`api/v1/users/admin/users/${id}/`).put(
            null,
            {
                is_active: active,
            }
        );
        return result;
    }

    async getRoles() {
        let result = await api(
            `api/v1/users/admin/users/roles/`
        ).get();
        return result;
    }

    async getUsersId(id) {
        let result = await api(
            `api/v1/users/admin/users/${id}`
        ).get();
        return result;
    }

    async patchUsers(role, id) {
        let result = await api(
            `api/v1/users/admin/users/${id}/`
        ).patch(null, {
            role: role,
        });
        return result;
    }

    //WORK
    async getWork(city, page) {
        let result = await api(
            `api/v1/employments/?page=${page}&city_name=${city}`
        ).get();
        return result;
    }

    async CreateWork(data, description) {
        let result = await api(`api/v1/employments/`).post(null, {
            name: data.name,
            description: description,
            city: data.city,
            preview: data.preview,
        });
        return result;
    }

    async patchWork(name, city, preview, description, id) {
        let result = await api(`api/v1/employments/${id}/`).patch(
            null,
            {
                name: name,
                description: description,
                city: city,
                preview: preview,
            }
        );
        return result;
    }

    async getWorkId(id) {
        let result = await api(`api/v1/employments/${id}`).get();
        return result;
    }

    async deleteWork(id) {
        let result = await api(`api/v1/employments/${id}/`).delete(
            null
        );
        return result;
    }

    //getTags
    async getTopic() {
        let result = await api(`api/v1/blogs/tags/`).get();
        return result;
    }

    async createTag(data) {
        let result = await api(`api/v1/blogs/tags/`).post(null, data);
        return result;
    }

    getTopicId(id) {
        let result = api(`api/v1/blogs/tags/${id}`).get();
        return result;
    }

    deleteTag(id) {
        let result = api(`api/v1/blogs/tags/${id}`).delete(null);
        return result;
    }

    patchTag(data, id) {
        let result = api(`api/v1/blogs/tags/${id}`).put(null, {
            name: data,
        });
        return result;
    }

    //autocomplite
    getAutoComplite(value) {
        const result = api(
            `api/v1/goods/autocomplete/?name=${value}`
        ).get();
        return result;
    }

    //goods
    getGoodsId(id) {
        const result = api(`api/v1/goods/${id}/`).get();
        return result;
    }

    getGoodsEmpty(currentPage, emptyStatus, productName) {
        const result = api(
            `api/v1/goods/empty/?page=${currentPage}&esphoto_empty_values=${emptyStatus}&name=${productName}`
        ).get();
        return result;
    }
    async postGoodsEmpty(code, id) {
        let result = await api(`api/v1/goods/empty/`).post(null, {
            code: code,
            good_id: id,
        });
        return result;
    }

    async patchGoodsEmpty(code, id) {
        let result = await api(`api/v1/goods/empty/`).patch(null, {
            code: code,
            good_id: id,
        });
        return result;
    }

    async deleteCatalog(id) {
        let result = await api(
            `api/v1/promotion/collection/${id}`
        ).delete(null);
        return result;
    }

    getCatalogs(page) {
        const result = api(
            `api/v1/promotion/collection/?page=${page}`
        ).get();
        return result;
    }

    async postCatalog(data) {
        let result = await api(`api/v1/promotion/collection/`).post(
            null,
            data
        );
        return result;
    }

    async patchCatalog(data, id) {
        let result = await api(
            `api/v1/promotion/collection/${id}`
        ).patch(null, data);
        return result;
    }

    getAdvantages(page, deportaments) {
        const result = api(
            `api/v1/blogs/advantage/?page=${page}&department=${deportaments}`
        ).get();
        return result;
    }

    getDeportaments() {
        const result = api(`api/v1/departments/`).get();
        return result;
    }

    async postAdvantage(data) {
        let result = await api(`api/v1/blogs/advantage/`).post(
            null,
            data
        );
        return result;
    }
    async patchAdvantage(data, id) {
        let result = await api(`api/v1/blogs/advantage/${id}`).patch(
            null,
            data
        );
        return result;
    }
}

export default new API();
