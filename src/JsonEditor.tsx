import { createContext, useContext, useState } from 'react';
import Controls from './components/Controls';
import MonacoEditor from './components/MonacoEditor';
import JsonTree from './components/JsonTree';
import ErrorDisplay from './components/ErrorDisplay';
import * as monaco from 'monaco-editor';
import JSONEditor from 'jsoneditor';
import './styles.css';

// Context to share editor instances and state
interface EditorContextType {
    monacoEditor: monaco.editor.IStandaloneCodeEditor | null;
    setMonacoEditor: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
    jsonEditor: JSONEditor | null;
    setJsonEditor: (editor: JSONEditor | null) => void;
    jsonContent: string;
    setJsonContent: (content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) throw new Error('useEditorContext must be used within EditorProvider');
    return context;
};

const JsonEditor: React.FC = () => {
    const [monacoEditor, setMonacoEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [jsonEditor, setJsonEditor] = useState<JSONEditor | null>(null);
    const [jsonContent, setJsonContent] = useState<string>(
        '{\n  "name": "John",\n  "age": 30,\n  "address": {\n    "city": "New York"\n  }\n}'
    );
    const [error, setError] = useState<string>('');

    const contextValue: EditorContextType = {
        monacoEditor,
        setMonacoEditor,
        jsonEditor,
        setJsonEditor,
        jsonContent,
        setJsonContent,
    };

    return (
        <EditorContext.Provider value={contextValue}>
            <div className="container">
                <h1>JSON Editor & Formatter</h1>
                <Controls setError={setError} />
                <div className="editor-container">
                    <MonacoEditor setError={setError} />
                    <JsonTree setError={setError} />
                </div>
                <ErrorDisplay error={error} />
            </div>
        </EditorContext.Provider>
    );
};

export default JsonEditor;