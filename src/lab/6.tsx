import { Form, Input, Button, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditStory = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Lấy dữ liệu chi tiết
  const { data, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/stories/${id}`);
      return res.data;
    },
  });

  // Fill form
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  // Update
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return axios.put(`http://localhost:3000/stories/${id}`, values);
    },
    onSuccess: () => {
      // reload list
      queryClient.invalidateQueries({ queryKey: ["stories"] });

      // quay lại list
      navigate("/");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Spin />;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Tên truyện">
        <Input />
      </Form.Item>

      <Form.Item name="author" label="Tác giả">
        <Input />
      </Form.Item>

      <Form.Item name="image" label="Ảnh">
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={mutation.isPending}>
        Cập nhật
      </Button>
    </Form>
  );
};

export default EditStory;