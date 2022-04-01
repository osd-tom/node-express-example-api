import { Request, Response } from "express"
import _ from "lodash"
import { ITodo } from "./../../types/todo"
import Todo from "../../models/todo"
import { sendResponse } from "../../helpers/commonResponse"
import { TODO_MSG, CODE } from "../../lang/response"
import { 
  checkIsExistedTodo,
  createAndSaveTodo,
  deleteTodoById,
  findAllTodo,
  findTodoBy,
  updateAndSaveTodo
} from "../../services/todo"

/**
 * Get todo list
 * 
 * @param request 
 * @param response 
 */
const getTodoList = async (request: Request, response: Response): Promise<void> => {
  try {
    const todoList: ITodo[] = await findAllTodo([])
    sendResponse(
      response,
      CODE.SUCCESS,
      TODO_MSG.LISTS.GET_SUCCESS,
      { todoList }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      TODO_MSG.LISTS.GET_FAILURE,
      {}
    )
  }
}

/**
 * Get specific todo item
 * 
 * @param request 
 * @param response 
 */
const getTodo = async (request: Request, response: Response): Promise<void> => {
  try {
    const { params: { id } } = request
    
    const todo: ITodo | null = await findTodoBy([{_id: id}], [])
    if (_.isEmpty(todo)) {
      sendResponse(
        response,
        CODE.FAILURE,
        TODO_MSG.TODO.ITEM_NOT_FOUND,
        {}
      )
    }

    sendResponse(
      response,
      CODE.SUCCESS,
      TODO_MSG.TODO.GET_TODO_SUCCESS,
      { todo }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      TODO_MSG.TODO.GET_TODO_FAILURE,
      {}
    )
  }
}

/**
 * Create todo
 * 
 * @param request 
 * @param response 
 */
const createTodo = async (request: Request, response: Response): Promise<void> => {
  try {
    const body = request.body as Pick<ITodo, "name" | "description" | "status">
    const params = {
      name: body.name,
      description: body.description,
      status: body.status
    }

    const newTodo: ITodo = await createAndSaveTodo(params)
    const todoList: ITodo[] = await Todo.find()
    sendResponse(
      response,
      CODE.SUCCESS,
      TODO_MSG.TODO.CREATE_SUCCESS,
      { newTodo, todoList }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      TODO_MSG.TODO.CREATE_FAILURE,
      {}
    )
  }
}

/**
 * Update todo
 * 
 * @param request 
 * @param response 
 */
const updateTodo = async (request: Request, response: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = request

    if (!await checkIsExistedTodo(id)) {
      sendResponse(
        response,
        CODE.FAILURE,
        TODO_MSG.TODO.ITEM_NOT_FOUND,
        {}
      )
    }

    const todo = await updateAndSaveTodo(id, body)
    sendResponse(
      response,
      CODE.SUCCESS,
      TODO_MSG.TODO.UPDATE_SUCCESS,
      { todo }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      TODO_MSG.TODO.UPDATE_FAILURE,
      {}
    )
  }
}

/**
 * Delete todo
 * 
 * @param request 
 * @param response 
 */
const deleteTodo = async (request: Request, response: Response): Promise<void> => {
  try {
    const {
      params: { id }
    } = request

    if (!await checkIsExistedTodo(id)) {
      sendResponse(
        response,
        CODE.FAILURE,
        TODO_MSG.TODO.ITEM_NOT_FOUND,
        {}
      )
    }

    await deleteTodoById(id)
    const todoList: ITodo[] = await Todo.find()
    sendResponse(
      response,
      CODE.SUCCESS,
      TODO_MSG.TODO.DELETE_SUCCESS,
      { todoList }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      TODO_MSG.TODO.DELETE_FAILURE,
      {}
    )
  }
}

export { 
  getTodoList,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
}
