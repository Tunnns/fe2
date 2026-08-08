// import { Table } from "antd";
import { Button, Form, Input, Select, Table, Modal, Popconfirm, Space, message, Spin } from "antd";
import { Link } from 'react-router-dom'
import { useQueryClient, useQuery, useMutation, QueryClient, } from '@tanstack/react-query'
import axios from "axios"
import { useState, } from "react"

interface khoahoc {
  id:  number;
  title: string;
  duration: number;
  thumbnail: string;
  category: string;
}

function ListPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery<khoahoc[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get(` http://localhost:3000/courses`)
      return res.data
    }
  })
  const columns = [
    {
      title: "ID",
      dataIndex: "id"
    }, {
      title: "Name",
      dataIndex: "title"
    }, {
      title: "thumbnail",
      dataIndex: "thumbnail"
    }, {
      title: "duration",
      dataIndex: "duration"
    }, {
      title: "category",
      dataIndex: "category"
    },
    {
      title: "Action",
      render: (record: any) => {
        console.log(record)
        return (
          <Space>
            <Popconfirm title="delete" onConfirm={() => mutate(record.id)} okText="ok" cancelText="no ok">
              <Button>xoá</Button>
            </Popconfirm>
              <Button type="link" href={`/edit/${record.id}`}>edit</Button>
          </Space>
        )
      }
    }
  ]

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/courses/${id}`);},

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      }
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default ListPage;
