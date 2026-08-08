import { useNavigate, useParams } from "react-router-dom";
import useStoryDetail from "./hook/useStoryDetail";



const Detail = () => {
//     const { id } = useParams()
//     const navigate = useNavigate();
//     const { data: Story, isLoading, isError } = useStoryDetail(id)
//     if (isLoading) { return <Spin /> }
//     if (isError) { return <div>loi</div> }

//     return (
//         <Card title={story.title}>
//             <img src={story.image} alt="story.image" />

//             <p><strong>ID:</strong> {story.id}</p>

//             <p><strong>Tác giả:</strong> {story.author}</p>

// <p><strong>Mô tả:</strong> {story.description}</p>

//             <Button onClick={() => navigate("/lab4")}>
// Quay lại
//             </Button>
//         </Card>
//     );

}

export default Detail;