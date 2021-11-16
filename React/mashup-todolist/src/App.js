import TodoHeader from "./todo/TodoHeader";
import TodoList from "./todo/TodoList";
import TodoTemplate from "./todo/TodoTemplate";
import TodoCreate from "./todo/TodoCreate";
import { TodoProvider } from "./TodoContext";

function App() {
    return (
        <>
            <TodoProvider>
                <TodoTemplate>
                    <TodoHeader />
                    <TodoList />
                    <TodoCreate />
                </TodoTemplate>
            </TodoProvider>
        </>
    );
}

export default App;
