import { Form, Input, Button, InputNumber } from "antd";

function Bai3L3
() {
  const onFinish = (data: any) => {
    console.log(data);
  };
  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="name"
        name="name"
        rules={[
          { required: true, message: "hay nhap tên sản phẩm" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true,  message: "hay nhap GIÁ"},]}
      >
        <InputNumber />
      </Form.Item>
        <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true ,  message: "hay nhap số lượng"},]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true ,  message: "hay nhap mô tả"},]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}
export default Bai3L3
;
