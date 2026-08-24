import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPage() {

  const queryClient=useQueryClient()
  const nav=useNavigate()
  const addMutation=useMutation({
    mutationFn: async(newTeacher:any)=>{
      const res=await axios.post(`http://localhost:3000/teachers`,newTeacher)
      return res.data
    },
    onSuccess: async()=>{
      await queryClient.invalidateQueries({queryKey: ["teachers"]})
      nav('/list')
    }
  })
  const handleAdd=(values:any)=>{
    addMutation.mutate(values)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6" >Thêm mới</h1>

      <Form layout="vertical" className="space-y-6" onFinish={handleAdd}>
        {/* Text input */}
        <Form.Item label="Input" name="name">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="Input" name="experience">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="Input" name="address">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="Input" name="email">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

        {/* Select */}
        <Form.Item label="Danh mục" name="active">
          <Input placeholder="Nhập thông tin" />
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
