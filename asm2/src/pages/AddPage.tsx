import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const addMutation = useMutation({
    mutationFn: async(newAnimal: any)=>{
      const res=await axios.post(`http://localhost:3000/animals`, newAnimal)
      return res.data
    },

    onSuccess: async()=>{
      await queryClient.invalidateQueries({queryKey: ["animals"]})
      nav('/list')
    }
  })

  const handleAdd = (values: any)=>{
    addMutation.mutate(values)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>
      <Form layout="vertical" className="space-y-6" onFinish={handleAdd}>
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

export default AddPage;
