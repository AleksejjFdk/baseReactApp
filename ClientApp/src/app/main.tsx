import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useAppSelector } from "../redux/utils/hooks/useSelector"
import {  selectCount } from "../redux/store/exampleSlice/exampleSlice"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { useAppDispatch } from "../redux/utils/hooks/useDispatch"

export const Main: React.FC = () => {
    const counter = useAppSelector<number>(selectCount)
    const dispatch = useAppDispatch()

    return <>{counter}</>
}

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>
    , document.getElementById("root"))