import React from 'react';
import Editor from './Editor'
import { ResponseContainer } from '../container'
import ReactJson from 'react-json-view'



export default function ConfigurationEditor() {
    let apiResponse = ResponseContainer.useContainer()

    React.useEffect(() => {
        apiResponse.data ? apiResponse.update(apiResponse.data) : apiResponse.update("Waiting...")
    }, [apiResponse, apiResponse.data])


    return (
        <React.Fragment>
            {/* <ReactJson src={apiResponse.data as any} enableClipboard={false} /> */}
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