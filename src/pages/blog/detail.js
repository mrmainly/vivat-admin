import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Select, Upload, Button, Form, message, Spin } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";
import "./blog.css";

const { Option } = Select;

const BlogDetail = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState("");
    const [image, setImage] = useState("");
    const [editorState, setEditorState] = useState();
    const [convertedContent, setConvertedContent] = useState(null);
    const [preview, setPreview] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getBlogDetail = async () => {
            setLoading(true);
            await API.getBlogDetail(params.id)
                .then((res) => {
                    const data = res.data;
                    console.log(res);
                    setName(data.name);
                    setPreview(data.preview);
                    setImage(data.image);
                    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data.description))));
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
        console.log("convert", convertedContent);
        console.log("editor", convertToHTML(editorState.getCurrentContent()));
        API.patchBlog(params.id, {
            name: name,
            image: photo,
            preview: preview,
            description: convertToHTML(editorState.getCurrentContent()),
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
                            <Input placeholder="Basic usage" onChange={(e) => setName(e.target.value)} value={name} style={{ width: 235 }} />
                        </Form.Item>

                        <Form.Item label="Короткое описание" labelCol={{ span: 24 }}>
                            <Input placeholder="Basic usage" style={{ width: 235 }} value={preview} onChange={(e) => setPreview(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Описание" labelCol={{ span: 24 }} className="wusi">
                            <Editor
                                defaultContentState={description}
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                            />
                        </Form.Item>

                        <img
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                border: "1px solid black",
                            }}
                            src={`https://xn----7sbbagaytx2c4ad.xn--p1ai${image}`}
                            alt=""
                        />
                        <Form.Item label="Изображение" labelCol={{ span: 24 }} style={{ width: 200 }}>
                            <input
                                type="file"
                                accept=".png, .jpg"
                                onChange={(event) => {
                                    fileSelectHandler(event);
                                }}
                            />
                        </Form.Item>

                        <Space>
                            <Button style={{ background: "#55CD61" }} type="primary" onClick={() => patchBlog()}>
                                Сохранить
                            </Button>
                            <Button style={{ background: "#FE5860" }} type="primary" onClick={() => deleteBlog()}>
                                Удалить
                            </Button>
                        </Space>
                    </Space>
                </Form>
            )}
        </div>
    );
};

export default BlogDetail;
