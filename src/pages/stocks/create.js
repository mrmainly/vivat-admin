import React, { useState, useEffect } from "react";
import "./create.css";
import {
    Input,
    Space,
    Select,
    Upload,
    Button,
    Form,
    DatePicker,
    TimePicker,
    AutoComplete,
    message,
    Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { StocksDetailTable } from "../../components";
import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const dateFormat = "YYYY-MM-DD";

const StockCreate = () => {
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [photo, setPhoto] = useState("");
    const [banner, setBanner] = useState("");

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);

    const navigate = useNavigate();

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(
            editorState.getCurrentContent()
        );
        setConvertedContent(currentContentAsHTML);
    };

    const fileSelectHandler = (e) => {
        setPhoto(e.target.files[0]);
    };

    const CreateStocks = () => {
        API.CreatePromotion({
            name: name,
            description: convertedContent,
            date_start: dateStart,
            date_end: dateEnd,
            image: photo,
            banner_image: banner,
        })
            .then((res) => {
                message.success("Акция создана");
                navigate(ROUTES.STOCKS);
            })
            .catch((error) => message.error("Акция не создана"));
    };
    return (
        <div>
            <Form>
                <Space direction="vertical">
                    <Form.Item
                        label="Название"
                        name="name"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Basic usage"
                            style={{ width: 235 }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Описание"
                        required
                        labelCol={{ span: 24 }}
                    >
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={handleEditorChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    </Form.Item>
                    <Form.Item
                        label="начало акции"
                        labelCol={{ span: 24 }}
                        required
                    >
                        <DatePicker
                            format={dateFormat}
                            onChange={(date, dateString) =>
                                setDateStart(dateString)
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="конец акции"
                        labelCol={{ span: 24 }}
                        required
                    >
                        <DatePicker
                            onChange={(date, dateString) =>
                                setDateEnd(dateString)
                            }
                            format={dateFormat}
                            // value={dateEnd}
                            // onChange={(e) => setDateEnd(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Изображение"
                        labelCol={{ span: 24 }}
                        style={{ width: 200 }}
                        required
                    >
                        <input
                            type="file"
                            accept=".png, .jpg"
                            onChange={(event) => {
                                fileSelectHandler(event);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Баннер"
                        labelCol={{ span: 24 }}
                        style={{ width: 200 }}
                        required
                    >
                        <input
                            type="file"
                            accept=".png, .jpg"
                            onChange={(e) => {
                                setBanner(e.target.files[0]);
                            }}
                        />
                    </Form.Item>
                    <Button
                        style={{ background: "#55CD61", marginTop: 20 }}
                        type="primary"
                        onClick={CreateStocks}
                    >
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default StockCreate;
