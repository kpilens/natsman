import React from 'react';
import CodeMirror, { Editor } from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/solarized.css';

const code = 'const a = 0;';


export default function CodeEditor() {
    return (


        <CodeMirror
            value={code}
            // onChange={(e) => {
            //     console.info(e)
            // }}
            options={{
                theme: 'solarized',
                tabSize: 2,
                keyMap: 'sublime',
                mode: 'json',
            }}
        />


    )
}