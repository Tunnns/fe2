import { Button, Form, Input, Select, Table, Modal, Popconfirm  } from "antd";
import { Link} from 'react-router-dom'
import {useQueryClient,useQuery,useMutation,} from '@tanstack/react-query'
import axios from "axios"
import {useState,} from "react"
import { record } from "zod";

function AddPage() {

interface khoahoc {
  id: string | number;
  title: string;
  duration: number;
  thumbnail: string;
  category: string;
}




const handleAdd=(id: string)=>{
  
}







  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form layout="vertical" className="space-y-6">
        {/* Text input */}
        <Form.Item label="Input" name="input">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

        {/* Select */}
        <Form.Item label="Danh mục" name="category">
          <Select placeholder="Chọn danh mục" options={[]} />
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
