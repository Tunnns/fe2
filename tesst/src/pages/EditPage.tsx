import { Button, Form, Input, Select, Spin, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

interface KHForm {
  title: string;
  duration: number;
  thumbnail: string;
  category: string;
}

function EditPage() {
  const { id } = useParams();
  const [form] = Form.useForm<KHForm>();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  // Lấy thông tin khóa học theo id
  const { data, isLoading } = useQuery({
    queryKey: ["course", id],

    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/courses/${id}`,
      );

      return res.data;
    },

    enabled: Boolean(id),
  });

  // Đưa dữ liệu cũ vào form
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  // Gửi dữ liệu cập nhật
  const editMutation = useMutation({
    mutationFn: async (values: KHForm) => {
      const res = await axios.patch(
        `http://localhost:3000/courses/${id}`,
        values,
      );

      return res.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      message.success("Cập nhật thành công");
      nav("/list");
    },

    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });

  const handleEdit = (values: KHForm) => {
    editMutation.mutate(values);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Cập nhật khóa học
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleEdit}
      >
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
          loading={editMutation.isPending}
        >
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}

export default EditPage;