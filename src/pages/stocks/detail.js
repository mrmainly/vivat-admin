import React, { useState, useEffect } from "react";
import "../../create.css";
import {
    Input,
    Space,
    Select,
    Upload,
    Button,
    Form,
    message,
    Spin,
    DatePicker,
    TimePicker,
    AutoComplete,
} from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const StockDetail = () => {
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState("");
    const [image, setImage] = useState("");
    const [autoCompliteValue, setAutoCompliteValue] = useState("");
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getBlogDetail = async () => {
            setLoading(true);
            await API.getBlogDetail(params.id)
                .then((res) => {
                    const data = res.data;
                    // console.log(data.tags[0].name);
                    console.log(res);
                    setName(data.name);
                    setTag(data.tags.name);
                    setImage(data.image);
                    setEditorState(
                        EditorState.createWithContent(
                            ContentState.createFromBlockArray(
                                convertFromHTML(data.description)
                            )
                        )
                    );
                })
                .catch((error) => console.log(error));
            await API.getTopic()
                .then((res) => {
                    setTags(res.data);
                    console.log(res);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getBlogDetail();
    }, []);

    const deleteBlog = () => {
        API.deleteBlog(params.id)
            .then((res) => {
                console.log(res);
                navigate(ROUTES.BLOG);
                message.success("Блог удален");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const patchBlog = () => {
        API.patchBlog(params.id, {
            name: name,
            image: photo,
            description: convertedContent,
        })
            .then((res) => {
                console.log(res);
                message.success("Блог изменен");
                navigate(ROUTES.BLOG);
            })
            .catch((error) => message.success("Блог не изменен"));
    };

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

    const handleSelect = (value) => {
        setTags(value);
    };

    const fileSelectHandler = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
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
                            <Input
                                placeholder="Basic usage"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                style={{ width: 235 }}
                            />
                        </Form.Item>

                        <Form.Item label="Описание" labelCol={{ span: 24 }}>
                            <Editor
                                defaultContentState={description}
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
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="конец акции"
                            labelCol={{ span: 24 }}
                            required
                        >
                            <DatePicker />
                        </Form.Item>

                        <img
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                border: "1px solid black",
                            }}
                            src={`http://xn----7sbbagaytx2c4ad.xn--p1ai${image}`}
                        />
                        <Form.Item
                            label="Изображение"
                            labelCol={{ span: 24 }}
                            style={{ width: 200 }}
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
                            label="Акционные товары"
                            labelCol={{ span: 24 }}
                        >
                            <AutoComplete
                                value={autoCompliteValue}
                                onChange={(data) => setAutoCompliteValue(data)}
                                // options={options}
                                style={{
                                    width: 200,
                                }}
                                // onSelect={onSelect}
                                // onSearch={onSearch}
                                // onChange={onChange}
                                placeholder="control mode"
                            />
                        </Form.Item>

                        <Space>
                            <Button
                                style={{ background: "#55CD61" }}
                                type="primary"
                                onClick={() => patchBlog()}
                            >
                                Сохранить
                            </Button>
                            <Button
                                style={{ background: "#FE5860" }}
                                type="primary"
                                onClick={() => deleteBlog()}
                            >
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
