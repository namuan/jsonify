import { useEditorContext } from '../JsonEditor';

interface ControlsProps {
    setError: (error: string) => void;
}

const Controls: React.FC<ControlsProps> = ({ setError }) => {
    const { monacoEditor, jsonEditor, jsonContent } = useEditorContext();

    const handleFormat = () => {
        try {
            const json = JSON.parse(jsonContent);
            const formatted = JSON.stringify(json, null, 2);
            monacoEditor?.setValue(formatted);
            jsonEditor?.set(json);
            setError('');
        } catch (e) {
            setError('Invalid JSON: ' + (e as Error).message);
        }
    };

    const handleValidate = () => {
        try {
            JSON.parse(jsonContent);
            setError('Valid JSON');
        } catch (e) {
            setError('Invalid JSON: ' + (e as Error).message);
        }
    };

    const handleCollapse = () => {
        jsonEditor?.collapseAll();
    };

    const handleExpand = () => {
        jsonEditor?.expandAll();
    };

    return (
        <div className="controls">
            <button onClick={handleFormat}>Format JSON</button>
            <button onClick={handleValidate}>Validate JSON</button>
            <button onClick={handleCollapse}>Collapse All</button>
            <button onClick={handleExpand}>Expand All</button>
        </div>
    );
};

export default Controls;