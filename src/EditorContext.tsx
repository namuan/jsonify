import { createContext, useContext } from 'react';
import * as monaco from 'monaco-editor';
import JSONEditor from 'jsoneditor';

// Context to share editor instances and state
export interface EditorContextType {
    monacoEditor: monaco.editor.IStandaloneCodeEditor | null;
    setMonacoEditor: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
    jsonEditor: JSONEditor | null;
    setJsonEditor: (editor: JSONEditor | null) => void;
    jsonContent: string;
    setJsonContent: (content: string) => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) throw new Error('useEditorContext must be used within EditorProvider');
    return context;
};