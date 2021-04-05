import { useState } from "react"
import { createContainer } from "unstated-next"

function useEditorState(initialState = "") {
    let [data, setData] = useState(initialState)
    let update = (nextState: string) => setData(nextState)
    return { data, update }
}

export let ConfigurationEditorContainer = createContainer(useEditorState)
export let PayloadEditorContainer = createContainer(useEditorState)
export let ResponseEditorContainer = createContainer(useEditorState)