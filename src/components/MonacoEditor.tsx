import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { useEditorContext } from '../EditorContext';

interface MonacoEditorProps {
    setError: (error: string) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ setError }) => {
    const monacoRef = useRef<HTMLDivElement>(null);
    const { setMonacoEditor, setJsonContent, jsonContent } = useEditorContext();

    useEffect(() => {
        if (monacoRef.current) {
            const editor = monaco.editor.create(monacoRef.current, {
                value: jsonContent,
                language: 'json',
                theme: 'vs-dark',
                automaticLayout: true,
            });

            setMonacoEditor(editor);

            const subscription = editor.onDidChangeModelContent(() => {
                const value = editor.getValue();
                setJsonContent(value);
                try {
                    JSON.parse(value);
                    setError('');
                } catch {
                    setError('Invalid JSON');
                }
            });

            return () => {
                editor.dispose();
                subscription.dispose();
            };
        }
    }, [setMonacoEditor, setJsonContent, setError, jsonContent]);

    return <div ref={monacoRef} className="editor" />;
};

export default MonacoEditor;