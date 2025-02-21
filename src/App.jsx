import React, { useState } from "react";
import { PlusCircle, Trash2, CheckCircle, Circle } from "lucide-react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Todo List
          </h1>

          <form onSubmit={addTodo} className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo..."
                className="w-full px-4 py-2 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                maxLength={280}
              />
              <button
                type="submit"
                className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-base sm:text-lg transition-colors duration-200 ${
                  input.trim() ? "bg-emerald-500 text-white hover:bg-emerald-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!input.trim()}
              >
                <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sm:hidden md:inline">Add</span>
              </button>
            </div>
          </form>

          <div className="space-y-2 sm:space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg ${
                  todo.completed ? "bg-gray-50" : "bg-white"
                } border border-gray-200 shadow-sm transition-all duration-200`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-emerald-500 hover:text-emerald-500 transition-colors duration-200 flex-shrink-0 mt-0.5"
                >
                  {todo.completed ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Circle className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
                <div
                  className={`flex-1 min-w-0 text-sm sm:text-base ${
                    todo.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{todo.text}</p>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200 flex-shrink-0 mt-0.5"
                  aria-label="Delete todo"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
          </div>

          {todos.length === 0 ? (
            <div className="text-center text-gray-500 mt-6 sm:mt-8 text-sm sm:text-base">
              No todos yet. Add one above!
            </div>
          ) : (
            <button
              onClick={clearTodos}
              className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-base sm:text-lg"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
