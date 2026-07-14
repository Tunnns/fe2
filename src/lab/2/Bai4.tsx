import { useState } from "react";
import { Form, Input, Button, Select, Card } from "antd";

const { TextArea } = Input;

function Bai4L3() {
  const [post, setPost] = useState<any>(null);

  const onFinish = (values: any) => {
    console.log(values);
    setPost(values);
  };

  return (
    <div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "tiêu đề" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "chọn danh mục" }]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={[
              { value: "Technology", label: "Technology" },
              { value: "Education", label: "Education" },
              { value: "Sports", label: "Sports" },
              { value: "Entertainment", label: "Entertainment" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "nhập slug!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "nhập nội dung!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        {/* Image URL */}
        <Form.Item
          label="Image URL"
          name="image"
          rules={[{ required: true, message: "Hãy nhập URL ảnh!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Hiển thị dữ liệu sau khi submit */}
      {post && (
        <Card title="Dữ liệu đã nhập" style={{ marginTop: 20 }}>
          <p><b>Title:</b> {post.title}</p>
          <p><b>Category:</b> {post.category}</p>
          <p><b>Slug:</b> {post.slug}</p>
          <p><b>Content:</b> {post.content}</p>
          <p><b>Image URL:</b> {post.image}</p>

          {post.image && (
            <img
              src={post.image}
              alt="Preview"
              style={{ width: 200, marginTop: 10 }}
            />
          )}
        </Card>
      )}
    </div>
  );
}

export default Bai4L3;