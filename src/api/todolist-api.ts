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
        return instance.get<Array<todolistTypeResponce>>("todo-lists")
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

        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string,task:any) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`,task)
    }

}
type todolistTypeResponce = {
    id: string
    title: string
    addDate: string
    order: number

}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: todolistTypeResponce
    }
}

type getTodolists = {
    data: {
        data: todolistTypeResponce[]
    }
    status: number
    statusText: string
}
