import { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import { useEditorContext } from '../EditorContext';
import * as React from "react";

interface JsonTreeProps {
    setError: (error: string) => void;
}

const JsonTree: React.FC<JsonTreeProps> = ({ setError }) => {
    const treeRef = useRef<HTMLDivElement>(null);
    const { setJsonEditor, jsonContent, setJsonContent } = useEditorContext();

    useEffect(() => {
        if (treeRef.current) {
            const jsonEditor = new JSONEditor(treeRef.current, {
                mode: 'tree',
                mainMenuBar: true,
                navigationBar: true,
                statusBar: true,
                onChangeText: (jsonString: string) => {
                    setJsonContent(jsonString);
                },
            });

            setJsonEditor(jsonEditor);

            try {
                jsonEditor.set(JSON.parse(jsonContent));
            } catch {
                setError('Initial JSON invalid');
            }

            return () => {
                jsonEditor.destroy();
            };
        }
    }, [setJsonEditor, jsonContent, setJsonContent, setError]);

    return <div ref={treeRef} className="tree" />;
};

export default JsonTree;