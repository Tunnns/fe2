// import { Table } from "antd";
import { Button, Form, Input, Select, Table, Modal, Popconfirm, Space, message, Spin  } from "antd";
import { Link} from 'react-router-dom'
import {useQueryClient,useQuery,useMutation,} from '@tanstack/react-query'
import axios from "axios"
import {useState,} from "react"

interface khoahoc {
  id: string | number;
  title: string;
  duration: number;
  thumbnail: string;
  category: string;
}

// const khoahoc=()=>{
//   const queryClient=useQueryClient();
//   const [keyWord,setKeyWord]= useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form]= Form.useForm()
// }



// const addMutation=useMutation({
//   mutationFn: async(newKhoahoc: Omit<khoahoc, 'id'>)=>{
//     const res =await axios.post(' http://localhost:3000/courses',{
//       ...newKhoahoc
//     }); return res.data
//   }
// })

// const handleDelete=(id: string)=>{
  
// }



// const filteredData=data?.filter((item: khoahoc)=>{
// item.title?.toLowerCase().includes(keyword.toLowerCase())
// })

function ListPage() {
  const {data}=useQuery<khoahoc[]>({
  queryKey: ["courses"],
  queryFn: async()=>{
    const res =await axios.get(` http://localhost:3000/courses`)
    return res.data
  }
})
  const columns=[
  {
    title: "ID",
    dataIndex: "id"
  },{
    title: "Name",
    dataIndex: "title"
  },{
    title: "thumbnail",
    dataIndex: "thumbnail"
  },{
    title: "duration",
    dataIndex: "duration"
  },{
    title: "category",
    dataIndex: "category"
  },
  // {
  //   title: "Action",
  //   dataIndex: "Action",
  //   render: (_any, record: khoahoc)=>(
  //     <Popconfirm title="delete" onConfirm={()=>handleDelete(record.id)} okText="ok" cancelText="no ok">
  //       <Button></Button>
  //     </Popconfirm>
  //   )
  // }
]
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
