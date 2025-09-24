import { v1 } from "uuid";
import { TasksState } from "../App";
import { CreateTodolistAction, DeleteTodolistAction } from "./todolists-reducer";

export const createTaskAC = (data: {todolistId: string, title: string}) => {
    return {type: 'create_task', payload: {data}} as const
}

export const deleteTaskAC = (data: {todolistId: string, taskId: string}) => {
    return {type: 'delete_task', payload: {data}} as const
}

export const changeTaskStatusAC = (data: {todolistId: string, taskId: string, isDone: boolean}) => {
    return {type: 'change_task_status', payload: {data}} as const
}

export const changeTaskTitleAC = (data: {todolistId: string, taskId: string, title: string}) => {
    return {type: 'change_task_title', payload: {data}} as const
}

type Actions = CreateTodolistAction | DeleteTodolistAction | CreateTaskAction | DeleteTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction

export const tasksReducer = (state: TasksState, action: Actions): TasksState => {
    switch(action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const updatedTasks = {...state}

            delete updatedTasks[action.payload.id]

            return updatedTasks
        }
        case 'create_task': {
            const {todolistId, title} = action.payload.data
            const newTask = {id: v1(), title, isDone: false}

            return {...state, [todolistId]: [...state[todolistId], newTask]}
        }
        case 'delete_task': {
            const {todolistId, taskId} = action.payload.data
            const updatedTasks = state[todolistId].filter(task => task.id !== taskId)

            return {...state, [todolistId]: [...updatedTasks]}
        }
        case 'change_task_status': {
            const {todolistId, taskId, isDone} = action.payload.data
            const updatedTasks = state[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)

            return {...state, [todolistId]: updatedTasks}
        }
        case 'change_task_title': {
            const {todolistId, taskId, title} = action.payload.data
            const updatedTasks = state[todolistId].map(task => task.id === taskId ? {...task, title} : task)

            return {...state, [todolistId]: updatedTasks}
        }
        default:
            return state
    }
}

export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>