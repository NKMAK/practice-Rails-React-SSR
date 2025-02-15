import HeavyComponent from "./components/HeavyComponent";
import NotSuspenTodos from "./components/notSuspenseTodo";
import DataLoader from "./components/DataLoader";

const App = () => {
  return (
    <div style={{ border: '3px solid black' }}>
      <h1>Appコンポーネント</h1>
      <HeavyComponent />
      <NotSuspenTodos />
      <DataLoader />
    </div>
  );
}

export default App;
