import Header from './Header';
import Main from './Main';
import LoginScreen from '../screens/LoginScreen.js';
import { useAuth } from '../Contexts/AuthContextProvider.js';
import { QuizProvider } from '../Contexts/QuizContextProvider.js';

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      <Header />

      <QuizProvider>
        <Main />
      </QuizProvider>
    </div>
  );
}

export default App;
