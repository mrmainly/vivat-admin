import { Row, Col, Button, Form, AutoComplete, Select } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

const { Option } = Select;

const FormListGoods = ({ options, handleAutoComplite }) => {
    return (
        <Form.List name="goods" initialValue={[{}]}>
            {(fields, { add, remove }) => {
                return (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row key={key} justify="space-between" style={{ width: 500 }}>
                                <Col span={18}>
                                    <Form.Item
                                        {...restField}
                                        name={[name]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Заполните название товара",
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            onSearch={handleAutoComplite}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options?.map((item, index) => (
                                                <Option value={item.id} key={index}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Form.Item>
                                    <DeleteTwoTone twoToneColor="#EB5757" onClick={() => remove(name)} />{" "}
                                </Form.Item>
                            </Row>
                        ))}
                        <Form.Item>
                            <Button onClick={() => add()} block type="primary" ghost style={{ width: "max-content" }}>
                                Добавить вариант ответа
                            </Button>
                        </Form.Item>
                    </>
                );
            }}
        </Form.List>
    );
};

export default FormListGoods;
