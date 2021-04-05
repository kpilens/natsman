import React from 'react';
import Editor from './Editor'
import { PayloadEditorContainer } from '../container'


export default function PayloadEditor() {
    let payload = PayloadEditorContainer.useContainer()

    // React.useEffect(() => {
    //     // effect
    // }, [payload.data])

    const handleChange = (value: Record<any, string> | any) => {
        console.log(value)
        payload.update(value)
    }

    return (
        <React.Fragment>
            <Editor
                onChange={handleChange}
            />
            <small>{JSON.stringify(payload.data)}</small>
        </React.Fragment>
    )
}