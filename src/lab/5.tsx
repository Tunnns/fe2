import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import axios from "axios";

interface StoryForm {
    title: string;
    description?: string;
    image?: string;
    categoryId: string | number;
    active?: boolean;
}

interface Category {
    id: string | number;
    title: string;
}

function Lab5() {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/categories");
            return response.data;
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: StoryForm) => {
            await axios.post("http://localhost:3000/stories", data);
        },
        onSuccess: () => {
            message.success("Them thanh cong");
        },
        onError: () => {
            message.error("Them that bai");
        },
    });

    const onFinish = (values: StoryForm) => {
        console.log(values);
        mutate(values);
    };

    const categoryOptions = categories?.map((category) => ({
        value: category.id,
        label: category.title,
    })) || [];

    return (
        <div>
            <h2>Lab5</h2>
            <Form onFinish={onFinish}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        { required: true },
                        { min: 3 },
                    ]}>
                    <Input disabled={isPending} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input disabled={isPending} />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                >
                    <Input disabled={isPending} />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[{ required: true, message: "chọn danh mục" }]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        loading={isCategoriesLoading}
                        disabled={isPending || isCategoriesLoading}
                        options={categoryOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="Active"
                    name="active"
                >
                    <Input disabled={isPending} />
                </Form.Item>
                <Button htmlType="submit" disabled={isPending}>Submit</Button>
            </Form>
        </div>
    );
}

export default Lab5;