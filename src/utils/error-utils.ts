import { setErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
