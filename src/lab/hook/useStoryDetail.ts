import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Story {
    id: string | number;
    title: string;
    image: string;
    author: string;
    description: string;
    createdAt?: string;
}

const useStoryDetail = (id: string | number) => {
    return useQuery<Story>({
        queryKey: ["story", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/stories/${id}`);
            return res.data;
        },
        enabled: Boolean(id)
    })
}

export default useStoryDetail;