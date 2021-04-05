import React from 'react';
import Editor from './Editor'
import { ConfigurationEditorContainer } from '../container'


export default function ConfigurationEditor() {
    let configuration = ConfigurationEditorContainer.useContainer()

    const handleChange = (value: Record<any, string> | any) => {
        console.log(value)
        configuration.update(value)
    }

    return (
        <React.Fragment>
            <Editor
                onChange={handleChange}
            />
            <small>{JSON.stringify(configuration.data)}</small>
        </React.Fragment>
    )
}