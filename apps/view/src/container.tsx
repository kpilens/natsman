import { useState } from "react"
import { createContainer } from "unstated-next"

function useEditorState(initialState = "{}") {
    let [data, setData] = useState(initialState)
    let update = (nextState: string) => setData(nextState)
    return { data, update }
}

export let ConfigurationContainer = createContainer(useEditorState)
export let PayloadContainer = createContainer(useEditorState)
export let ResponseContainer = createContainer(useEditorState)