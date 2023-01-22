import axios from "axios";

let instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': "6408b3a3-6577-4f97-aa9e-f7b63990ec1a"
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get("todo-lists")

    },
    createTodolist(title: string) {
        return instance.post("todo-lists", {title})

    },
    deleteTodolist(id: string) {
        return instance.delete(`todo-lists/${id}`)

    },
    changeTodolistTitle(id: string, title: string) {
        return instance.put(`todo-lists/${id}`, {title})

    },
    addTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get(`https://social-network.samuraijs.com/api/1.1//todo-lists/ + ${todolistId} +/tasks`)

    }
}
type todolistTypeResponce = {
    id: string
    title: string
    addDate?: string
    order?: number

}
type getTodolists = {
    data: {
        data: todolistTypeResponce[]
    }
    status: number
    statusText: string
}
