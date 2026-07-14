import { useState } from "react";
import { Table, Image, Spin, Button, Input, Form, Modal, Space, message, Popconfirm } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Story {
  id: string | number;
  title: string;
  image: string;
  author: string;
  description: string;
  createdAt?: string;
}

const StoryList = () => {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data, isLoading, isError } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newStory: Omit<Story, "id">) => {
      const res = await axios.post("http://localhost:3000/stories", {
        ...newStory,
        createdAt: new Date().toISOString(),
      });
      return res.data;
    },
    onSuccess: () => {
      message.success("Thêm truyện thành công");
      setIsModalOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: () => {
      message.error("Lỗi khi thêm truyện");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa truyện thành công");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: () => {
      message.error("Lỗi khi xóa truyện");
    },
  });

  const handleDelete = (id: string | number) => {
    deleteMutation.mutate(id);
  };

  const handleAddStory = (values: Omit<Story, "id">) => {
    addMutation.mutate(values);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image"
    },
    {
      title: "Tên truyện",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date?: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Story) => (
        <Popconfirm
          title="xóa truyện này ?"
          onConfirm={() => handleDelete(record.id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="primary" danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];


  const filteredData = data?.filter((item: Story) =>
    item.title?.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <div>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm truyện
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Thêm truyện mới"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddStory}>
          <Form.Item
            label="Tên truyện"
            name="title"
            rules={[{ required: true, message: "nhập tên truyện" }]}
          >
          </Form.Item>

          <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "nhập tác giả" }]}
          >
          </Form.Item>

          <Form.Item
            label="URL Ảnh"
            name="image"
            rules={[{ required: true, message: "nhập URL ảnh" }]}
          >
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "nhập mô tả" }]}
          >
          </Form.Item>

          <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={addMutation.isPending}>
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StoryList;