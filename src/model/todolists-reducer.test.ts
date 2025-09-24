import { v1 } from 'uuid'
import { beforeEach, expect, test } from 'vitest'
import type { Todolist } from '../App'
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from './todolists-reducer'

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
    expect(endState[0].title).toEqual('What to buy')
})

test('correct todolist should be created', () => {
    const title = 'What to read'

    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
})

test('correct todolist title should be changed', () => {
    const title = 'What to do'

    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title}))

    expect(endState[1].title).toBe(title)
})

test('correct todolist filter should be changed', () => {
    const filter = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId1, filter}))

    expect(endState[0].id).toBe(todolistId1)
    expect(endState[0].filter).toBe(filter)
    expect(endState[1].filter).toBe('all')
})