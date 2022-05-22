import React, { useState } from "react";
import "../../create.css";
import { Input, Space, Select, Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";

const { Option } = Select;

const CityCreate = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);

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
                        />
                    </Form.Item>
                    <Button style={{ background: "#55CD61" }} type="primary">
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default CityCreate;
