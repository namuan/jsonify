import { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import { useEditorContext } from '../JsonEditor';

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
                onChangeText: (jsonString: string) => {
                    setJsonContent(jsonString);
                },
            });

            setJsonEditor(jsonEditor);

            try {
                jsonEditor.set(JSON.parse(jsonContent));
            } catch (e) {
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