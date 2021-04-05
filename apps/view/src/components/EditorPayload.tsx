import React from 'react';
import Editor from './Editor'
import { PayloadEditorContainer } from '../container'


export default function PayloadEditor() {
    let payload = PayloadEditorContainer.useContainer()

    const handleChange = (value: Record<any, string> | any) => {
        payload.update(value)
        console.log(payload.data)
    }

    return (
        <React.Fragment>
            <Editor
                onChange={handleChange}
            />
        </React.Fragment>
    )
}