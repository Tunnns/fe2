import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams()
  const [form] = Form.useForm<any>()
  const queryClient = useQueryClient()
  const nav = useNavigate()

  const { data } = useQuery({
    queryKey: ["animals"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/animals/${id}`)
      return res.data
    },
    enabled: Boolean(id)
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])
  const editMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await axios.put(`http://localhost:3000/animals/${id}`, values)
      return res.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["animals"] })
      nav('/list')
    }
  })
  const handleEdit = (values: any) => {
    editMutation.mutate(values)
  }

  return (
<div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">sửa</h1>
      <Form layout="vertical" className="space-y-6" onFinish={handleEdit} form={form}>
        {/* Text input */}
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, whitespace: true, message: "Vui lòng nhập tên" }]}
        >
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item
          label="age"
          name="age"
          rules={[{ required: true, message: "Vui lòng nhập tuổi" }]}
        >
          <Input type="number" placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="image" name="image">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="description" name="description">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        {/* Select */}
        <Form.Item label="species" name="species">
          <Select placeholder="Chọn species" options={[
            {lable: "Chó", value:"Chó"},{lable: "Mèo", value:"Mèo"},{lable: "Chuột", value:"Chuột"}
          ]} />
        </Form.Item>
        {/* Submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditPage;
