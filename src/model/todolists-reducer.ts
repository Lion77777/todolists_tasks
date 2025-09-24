import { v1 } from "uuid"
import { FilterValues, Todolist } from "../App"

const initialState: Todolist[] = []

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
}

export const changeTodolistTitleAC = (data: {id: string, title: string}) => {
    return {type: 'change_todolist_title', payload: {data}} as const
}

export const changeTodolistFilterAC = (data: {id: string, filter: FilterValues}) => {
    return {type: 'change_todolist_filter', payload: {data}} as const
}

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
    switch(action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const {id, title} = action.payload
            const newTodolist: Todolist = {id, title, filter: 'all'}

            return [newTodolist, ...state]
        }
        case 'change_todolist_title': {
            const {id, title} = action.payload.data

            const newTodolist: Todolist[] = state.map(todolist => todolist.id === id ? {...todolist, title} : todolist)

            return newTodolist
        }
        case 'change_todolist_filter': {
            const {id, filter} = action.payload.data

            const newTodolist: Todolist[] = state.map(todolist => todolist.id === id ? {...todolist, filter} : todolist)

            return newTodolist
        }
        default: 
            return state
    }
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>