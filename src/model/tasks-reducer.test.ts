import { beforeEach, expect, test } from "vitest";
import { TasksState } from "../App";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer } from "./tasks-reducer";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: '1', title: 'HTML&CSS', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'ReactJS', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: true },
            { id: '2', title: 'milk', isDone: false },
            { id: '3', title: 'eggs', isDone: false },
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== 'todolistId1' && key !== 'todolistId2')

    if(!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
})

test('tasks with todolist id should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    expect(endState['todolistId2']).toBeUndefined()
})

test('task should be added correctly', () => {
    const endState = tasksReducer(startState, createTaskAC({todolistId: 'todolistId2', title: 'New Task'}))

    expect(endState['todolistId2'][3].title).toBe('New Task')
    expect(endState['todolistId2'].length).toBe(4)
})

test('task should be deleted correctly', () => {
    const endState = tasksReducer(startState, deleteTaskAC({todolistId: 'todolistId2', taskId: '2'}))

    expect(endState['todolistId2'].length).toBe(2)
})

test('task status should be changed correctly', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC({todolistId: 'todolistId1', taskId: '3', isDone: false}))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId1'][2].isDone).toBe(false)
})

test('task title should be changed correctly', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC({todolistId: 'todolistId1', taskId: '2', title: 'Another title'}))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][1].title).toBe('Another title')
})