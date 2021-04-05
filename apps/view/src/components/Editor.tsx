import React from "react";
import AceEditor, { IAceEditorProps } from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";

export default function AcEditor(props: IAceEditorProps): JSX.Element {
    // Render editor
    return (
        <AceEditor
            mode="json"
            style={{
                minHeight: "calc(100vh - 120px)",
                width: "100%"
            }}
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            {...props}
        />
    );
}