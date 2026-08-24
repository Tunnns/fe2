import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPage() {

const {id}= useParams()
const [form]=Form.useForm()
const queryClient=useQueryClient()
const nav=useNavigate()

const {data}=useQuery<any[]>({
    queryKey:['teachers'],
    queryFn: async()=>{
      const res = await axios.get(`http://localhost:3000/teachers/${id}`)
      return res.data
    }, enabled: Boolean(id)
  })

  useEffect(()=>{
    if(data){
      form.setFieldsValue(data)
    }
  },[data,form])

const editMutation=useMutation({
    mutationFn: async(values:any)=>{
      const res=await axios.put(`http://localhost:3000/teachers/${id}`,values)
      return res.data
    },
    onSuccess: async()=>{
      await queryClient.invalidateQueries({queryKey: ["teachers"]})
      nav('/list')
    }
  })
  const handleEdit=(values:any)=>{
    editMutation.mutate(values)
  }

  return (
 <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6" >sửa</h1>

      <Form layout="vertical" className="space-y-6" onFinish={handleEdit} form={form} >
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
          <Select placeholder="Chọn danh mục" options={[
            {}
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
