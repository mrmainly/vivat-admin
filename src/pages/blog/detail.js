import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Select, Upload, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const BlogDetail = () => {
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
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

    return (
        <div>
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

                    <Form.Item label="Тег" labelCol={{ span: 24 }} required>
                        <Select style={{ width: 235 }} onChange={handleSelect}>
                            {tags.map((item, index) => (
                                <Option value={item.name} key={index}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Описание"
                        required
                        labelCol={{ span: 24 }}
                    >
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
                        label="Изображение"
                        labelCol={{ span: 24 }}
                        style={{ width: 200 }}
                        required
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Space>
                        <Button
                            style={{ background: "#55CD61" }}
                            type="primary"
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
        </div>
    );
};

export default BlogDetail;
