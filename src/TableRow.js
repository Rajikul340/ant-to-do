import { Button, Form, Input, InputNumber } from "antd";
import { useState } from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {},
};
/* eslint-enable no-template-curly-in-string */

const TableRow = ({ onAddStudent }) => {
  const [data, setData] = useState("");
//   console.log('data', data);

  const onFinish = (values) => {
    const title = values?.title?.title;
    const time = values?.time?.time;
    const des = values?.des?.des;
    const date = values?.date?.date;
    const tag = values?.tag?.tag;
    const status = values?.status?.status;

    const addData = {
      time,
      title,
      des,
      date,
      tag,
      status,
    };
    // console.log('add data',values.date.date);
    setData(addData);
  };

  return (
    <Form
      className="grid-tem"
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name={["time", "time"]}>
        <Input placeholder="time" className="input" disabled />
      </Form.Item>
      <Form.Item name={["title", "title"]}>
        <Input placeholder="title" className="input" />
      </Form.Item>
      <Form.Item name={["des", "des"]}>
        <Input placeholder="description" className="input" />
      </Form.Item>
      <Form.Item name={["date", "date"]}>
        <Input placeholder="date" className="input" />
      </Form.Item>
      <Form.Item name={["tag", "tag"]}>
        <Input placeholder="tag" className="input" />
      </Form.Item>
      <Form.Item name={["status", "status"]}>
        <Input placeholder="status" className="input" />
      </Form.Item>

      <Form.Item>
        <Button
          onClick={() => onAddStudent(data)}
          type="primary"
          htmlType="submit"
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TableRow;
