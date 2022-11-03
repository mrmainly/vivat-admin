import React, { useState, useEffect } from "react";
import "./create.css";
import { Input, Space, Button, Form, DatePicker, AutoComplete, message, Spin } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { StocksDetailTable } from "../../components";
import API from "../../api";
import ROUTES from "../../routes";

const dateFormat = "YYYY-MM-DD";

const StockDetail = () => {
    const [options, setOptions] = useState([]);
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [goodsLoading, setGoodsLoading] = useState(false);
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [photo, setPhoto] = useState("");
    const [image, setImage] = useState("");
    const [banner, setBanner] = useState("");
    const [getBanner, setGetBanner] = useState("");

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    };

    const handleAutoComplite = (searchText) => {
        API.getAutoComplite(searchText)
            .then((res) => {
                const newData = res.data.map((item) => {
                    return { value: item.name, id: item.id };
                });
                setOptions(newData);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        const getPromotionId = async () => {
            setLoading(true);
            await API.getPromotionId(params.id)
                .then((res) => {
                    console.log(res);
                    const data = res.data;
                    let newData = res.data.goods.map((resGoods) => {
                        return {
                            price: resGoods.stocks.priceSale,
                            name: resGoods.name,
                            producer: resGoods.country,
                            id: resGoods.id,
                            count: resGoods.stocks.qty,
                        };
                    });
                    setName(data.name);
                    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data.description))));
                    setDateEnd(data.date_end);
                    setDateStart(data.date_start);
                    setImage(data.image);
                    setGoods(newData);
                    setGetBanner(data.banner_image);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getPromotionId();
    }, []);

    const deleteItem = (id) => {
        console.log(id);
        API.PromotionGoodsDelete(params.id, {
            good_id: id,
        });
        let copy = Object.assign([], goods);
        copy.forEach((el, i) => {
            if (el.id == id) copy.splice(i, 1);
        });
        setGoods(copy);
    };

    const onSelect = async (value, data) => {
        setGoodsLoading(true);
        await API.addedStocksGoodsId(params.id, {
            good_id: data.id,
        }).then(() => {
            API.getGoodsId(data.id).then((res) => {
                let newData = {
                    price: res.data.stocks.priceSale,
                    name: res.data.name,
                    producer: res.data.producer,
                    id: res.data.id,
                    count: res.data.stocks.qty,
                };
                let copy = Object.assign([], goods);
                copy.push(newData);
                setGoods(copy);
            });
        });

        setGoodsLoading(false);
    };

    const fileSelectHandler = (e) => {
        setPhoto(e.target.files[0]);
    };

    const fileBanner = (e) => {
        setBanner(e.target.files[0]);
    };

    const PromotionPatch = () => {
        API.PromotionPatch(
            {
                name: name,
                description: convertToHTML(editorState.getCurrentContent()),
                date_start: dateStart,
                date_end: dateEnd,
                image: photo,
                banner_image: banner,
            },
            params.id
        )
            .then((res) => {
                navigate(ROUTES.STOCKS);
                message.success("Акция изменена");
            })
            .catch((error) => message.error("Акция не изменена"));
    };

    const deletePromotion = () => {
        API.promotionDelete(params.id)
            .then((res) => {
                message.success("Акция удалена");
                navigate(ROUTES.STOCKS);
            })
            .catch((error) => {
                message.error("Акция не удалена");
            });
    };

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        marginTop: 120,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Form>
                    <Space direction="vertical">
                        <Form.Item
                            label="Название"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="Basic usage" style={{ width: 235 }} value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Описание" required labelCol={{ span: 24 }}>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                            />
                        </Form.Item>
                        <Form.Item label="начало акции" labelCol={{ span: 24 }} required>
                            <DatePicker format={dateFormat} onChange={(date, dateString) => setDateStart(dateString)} defaultValue={dateStart ? moment(dateStart, dateFormat) : ""} />
                        </Form.Item>
                        <Form.Item label="конец акции" labelCol={{ span: 24 }} required>
                            <DatePicker
                                onChange={(date, dateString) => setDateEnd(dateString)}
                                format={dateFormat}
                                defaultValue={dateEnd ? moment(dateEnd, dateFormat) : ""}
                                // value={dateEnd}
                                // onChange={(e) => setDateEnd(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item label="Изображение" labelCol={{ span: 24 }} style={{ width: 200 }} required>
                            <input
                                type="file"
                                accept=".png, .jpg"
                                onChange={(event) => {
                                    fileSelectHandler(event);
                                }}
                            />
                        </Form.Item>
                        <img
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                border: "1px solid black",
                            }}
                            alt=""
                            src={image}
                        />
                        <Form.Item label="Баннер" labelCol={{ span: 24 }} style={{ width: 200 }} required>
                            <input
                                type="file"
                                accept=".png, .jpg"
                                onChange={(e) => {
                                    fileBanner(e);
                                }}
                            />
                        </Form.Item>
                        <img
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                border: "1px solid black",
                            }}
                            src={getBanner}
                            alt=""
                        />
                        <Form.Item label="Акционные товары" labelCol={{ span: 24 }} required>
                            <AutoComplete
                                options={options}
                                onSelect={onSelect}
                                style={{
                                    width: 400,
                                }}
                                onSearch={handleAutoComplite}
                                placeholder="найти товар"
                            />
                        </Form.Item>
                        <StocksDetailTable data={goods} loading={loading} deleteItem={deleteItem} />
                        <Space style={{ marginTop: 20 }}>
                            <Button style={{ background: "#55CD61" }} type="primary" onClick={PromotionPatch}>
                                Сохранить
                            </Button>
                            <Button style={{ background: "#FE5860" }} type="primary" onClick={() => deletePromotion()}>
                                Удалить
                            </Button>
                        </Space>
                    </Space>
                </Form>
            )}
        </div>
    );
};

export default StockDetail;
