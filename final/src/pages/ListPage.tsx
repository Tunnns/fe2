import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Table } from "antd";
import axios from "axios";

function ListPage() {

  const queryClient=useQueryClient()
  const {data}=useQuery<any[]>({
    queryKey:['teachers'],
    queryFn: async()=>{
      const res = await axios.get(`http://localhost:3000/teachers`)
      return res.data
    }
  })

  const columns=[
    {
      title: "id",
      dataIndex: "id"
    },{
      title: "name",
      dataIndex: "name"
    },{
      title: "experience",
      dataIndex: "experience"
    },{
      title: "address",
      dataIndex: "address"
    },{
      title: "email",
      dataIndex: "email"
    },{
      title: "active",
      dataIndex: "active"
    },{
      title: "Action",
      render:(record:any)=>{
        return(
          <Space>
              <Popconfirm title="delete" onConfirm={()=>mutate(record.id)}>
                <Button>xoa</Button>
              </Popconfirm>
              <Button type="link" href={`/edit/${record.id}`}>sua</Button>
          </Space>
        )
      }
    }
  ]

  const{mutate}=useMutation({
    mutationFn:async(id: number)=>{
      await axios.delete(`http://localhost:3000/teachers/${id}`)
    },
    onSuccess: async()=>{
      await queryClient.invalidateQueries({queryKey: ["teachers"]})
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
