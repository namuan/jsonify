import JsonEditor from './JsonEditor';
import {ThemeProvider} from './components/Theme/ThemeContext';
import {GlobalStyles} from './components/Theme/GlobalStyles';

function App() {
    return (
        <ThemeProvider>
            <GlobalStyles />
            <JsonEditor />
        </ThemeProvider>
    );
}

export default App;