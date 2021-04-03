import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

export default function AcEditor() {

    function onChange(newValue: any) {
        console.log("change", newValue);
    }

    // Render editor
    return (
        <AceEditor
            mode="json"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
        />
    );
}