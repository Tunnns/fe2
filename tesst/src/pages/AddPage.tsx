import { Button, Form, Input, Select, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface KHForm {
  title: string;
  duration: number;
  thumbnail: string;
  category: string;
}

function AddPage() {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const addMutation = useMutation({
    mutationFn: async (newKH: KHForm) => {
      const res = await axios.post("http://localhost:3000/courses", newKH); 
      return res.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["courses"]});
      nav("/list");
    },

    onError: () => {
      message.error("loi");
    },
  });

  const handleAdd = (values: KHForm) => {
    addMutation.mutate(values);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Thêm mới</h1>

      <Form layout="vertical" onFinish={handleAdd}>
        <Form.Item label="Tên khóa học" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Thời lượng" name="duration">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Ảnh" name="thumbnail">
          <Input />
        </Form.Item>
        <Form.Item label="Danh mục" name="category">
          <Select
            options={[
              { label: "Javascript", value: "Javascript" },
              { label: "React", value: "React" },
            ]}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={addMutation.isPending}
        >Thêm</Button>
      </Form>
    </div>
  );
}

export default AddPage;
