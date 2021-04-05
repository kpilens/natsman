import React from 'react';
import Editor from './Editor'
import { ResponseEditorContainer } from '../container'


export default function ConfigurationEditor() {
    let apiResponse = ResponseEditorContainer.useContainer()

    React.useEffect(() => {
        apiResponse.data ? apiResponse.update(apiResponse.data) : apiResponse.update("Waiting...")
    }, [apiResponse, apiResponse.data])


    return (
        <React.Fragment>
            <Editor
                value={apiResponse.data}
                theme="dracula"
                readOnly
                style={{
                    minHeight: "calc(100vh - 80px)",
                    width: "100%"
                }}
            />
        </React.Fragment>
    )
}