import _ from "lodash"
import Todo from "../../models/todo"
import { ITodo } from "../../types/todo"

/**
 * Get todo list
 * 
 * @param queryOptions 
 * @returns todo list
 */
const findAllTodo = async (queryOptions: any | []) => {
  try {
    if (_.isEmpty(queryOptions)) {
      return await Todo.find()
    }

    return await Todo.find().select(queryOptions)
  } catch (error) {
    throw new Error(`Unable to connect to the database`)
  }
}

/**
 * Get specific todo
 * 
 * @param queryParams 
 * @param queryOptions 
 * @returns todo
 */
const findTodoBy = async (queryParams: any | [], queryOptions: any | []) => {
  try {
    const query = Todo.findOne({
      $or: queryParams
    })

    if (_.isEmpty(queryOptions)) {
      return await query
    }

    return await query.select(queryOptions)
  } catch (error) {
    throw new Error(`Unable to find todo with parameters: ${queryParams}`)
  }
}

/**
 * Create new todo
 * 
 * @param parameters 
 * @returns todo
 */
const createAndSaveTodo = async (parameters: any) => {
  try {
    const todoItem: ITodo = new Todo(parameters)
    const newTodo: ITodo = await todoItem.save()
    return newTodo
  } catch (error) {
    throw new Error(`Unable to connect to the database`)
  }
}

/**
 * Check is existed todo
 * 
 * @param todoId 
 * @returns boolean
 */
const checkIsExistedTodo = async (todoId: string | number) => {
  try {
    const todoData: ITodo | null = await Todo.findById(todoId)
    
    if (_.isEmpty(todoData)) {
      return false
    }
    return true
  } catch (error) {
    throw new Error(`Unable to find todo with id: ${todoId}`)
  }
}

/**
 * Update todo
 * 
 * @param todoId 
 * @param parameters 
 * @returns todo
 */
const updateAndSaveTodo = async (todoId: string | number, parameters: object) => {
  try {
    await Todo.findByIdAndUpdate({ _id: todoId }, parameters)
    return await findTodoBy([{_id: todoId}], [])
  } catch (error) {
    throw new Error(`Unable to update todo with id: ${todoId}`)
  }
}

/**
 * Delete todo by id
 * 
 * @param todoId 
 */
const deleteTodoById = async (todoId: string | number) => {
  try {
    await Todo.findByIdAndRemove(todoId)
  } catch (error) {
    throw new Error(`Unable to remove the todo with id: ${todoId}`)
  }
}

export {
  findAllTodo,
  findTodoBy,
  createAndSaveTodo,
  checkIsExistedTodo,
  updateAndSaveTodo,
  deleteTodoById
}