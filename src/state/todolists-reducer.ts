import {FilterValuesType, TodolistType} from "../App";


type ActionType = RemoveTodolistActionType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    [key: string]: any
    id: string
}
type AddTodolistType = {
    type: 'ADD-TODOLIST'
    [key: string]: any
    title: string
}
type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    [key: string]: any
    id: string
    title: string
}
type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    [key: string]: any
    id: string
    filter: FilterValuesType
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id != action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: '1', title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE': {
            let stateCopy = [...state]
            let changedTodolist = stateCopy.find(t => t.id === action.id)
            if (changedTodolist) {
                changedTodolist.title = action.title
            }
            return stateCopy
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let stateCopy = [...state]
            let changedTodolist = stateCopy.find(t => t.id === action.id)
            if (changedTodolist) {
                changedTodolist.filter = action.filter
            }
            return stateCopy
        }
        default:
            throw new Error('I dont understand this type')
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistTypeAC = (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST', title}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

