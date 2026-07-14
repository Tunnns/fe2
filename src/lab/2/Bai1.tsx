import { Form, Input, Button } from "antd";

function Bai1L3() {
  const onFinish = (values: any) => {
    console.log("Form data:", values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item label="Email" name="email" rules={[
          { required: true, message: "hay nhap title" },
        ]} >
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[
          { required: true, message: "hay nhap title" },
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Bai1L3;