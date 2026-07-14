import { Form, Input, Button } from "antd";

function Bai2L3() {
  const onFinish = (values: any) => {
    console.log("Form data:", values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item label="Name" name="name"  >
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone" >
        <Input />
      </Form.Item>
      
      <Form.Item label="Email" name="email" rules={[
          { required: true, message: "hay nhap email" },
          { type: "email", message: "Email không đúng định dạng" },
        ]} >
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[
          { required: true, message: "hay nhap password" },
          { min: 6, message: "Password phải có ít nhất 6 ký tự" },
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="Confirm" name="confirm" rules={[
          { required: true, message: "hay nhap lai password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Password xác nhận không khớp!")
              );
            },
          }),
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
export default Bai2L3;