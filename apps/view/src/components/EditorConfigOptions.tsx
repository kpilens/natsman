import React from 'react';
import Editor from './Editor'
import { ConfigurationContainer } from '../container'


export default function ConfigurationEditor() {
    let configuration = ConfigurationContainer.useContainer()

    const handleChange = (value: Record<any, string> | any) => {
        configuration.update(value)
        console.log(configuration.data)
    }

    return (
        <React.Fragment>
            <Editor
                onChange={handleChange}
            />
        </React.Fragment>
    )
}