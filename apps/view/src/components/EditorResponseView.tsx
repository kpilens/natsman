import React from 'react';
import Editor from './Editor'
import { ResponseEditorContainer } from '../container'


export default function ConfigurationEditor() {
    let apiResponse = ResponseEditorContainer.useContainer()
    apiResponse.update("We have a liftoff")


    const handleChange = (value: Record<any, string> | any) => {
        console.log(value)
        apiResponse.update(value)
    }

    return (
        <React.Fragment>
            <Editor
                onChange={handleChange}
                value={apiResponse.data}
                theme="dracula"
            />
            <small>{JSON.stringify(apiResponse.data)}</small>
        </React.Fragment>
    )
}