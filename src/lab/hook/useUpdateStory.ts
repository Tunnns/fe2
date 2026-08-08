import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Story {
    title: string;
    description?: string;
    image?: string;
    categoryId: string | number;
    active?: boolean;
}

const useUpdateStory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(values:Story)=>{
            const res = await axios.put("http://localhost:3000/stories", values);
            return res.data
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["stories"]})
        }
    })
}


export default useUpdateStory;