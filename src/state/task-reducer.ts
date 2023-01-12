import {TasksStateType} from "../App";
import {v1} from "uuid";
import {RemoveTodolistActionType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId)
            return {...state}
        }
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.newTitle, isDone: false};
            state[action.todolistId] = [task, ...state[action.todolistId]];
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.taskTitle} : t)
            }
        }
        case 'ADD-TODOLIST': {
            let todolistId = v1()
            return {
                ...state,
                [todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        default:
            throw new Error('I dont understand this type')
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (newTitle: string, todolistId: string) => ({type: 'ADD-TASK', newTitle, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => (
    {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const)
export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string) => (
    {type: 'CHANGE-TASK-TITLE', taskId, taskTitle, todolistId} as const)
export const AddTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title} as const)
export const RemoveTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)



type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | RemoveTodolistActionType
