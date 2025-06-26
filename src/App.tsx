import JsonEditor from './JsonEditor';
import { ThemeProvider } from './components/Theme/ThemeContext';
import { GlobalStyles } from './components/Theme/GlobalStyles';
import { ThemeSwitcher } from './components/Theme/ThemeSwitcher';

function App() {
    return (
        <ThemeProvider>
            <GlobalStyles />
            <ThemeSwitcher />
            <JsonEditor />
        </ThemeProvider>
    );
}

export default App;