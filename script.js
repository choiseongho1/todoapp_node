document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todosContainer = document.getElementById("todos-container");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    try {
      const response = await axios.post("http://localhost:3000/api/todos", {
        title,
        description,
      });
      const todo = response.data;
      displayTodo(todo);
      form.reset();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  });

  async function fetchTodos() {
    try {
      const response = await axios.get("http://localhost:3000/api/todos");
      const todos = response.data;
      todos.forEach((todo) => displayTodo(todo));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  function displayTodo(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;
    todosContainer.appendChild(todoElement);
  }

  async function deleteTodo(todoId) {
    try {
      await axios.delete(`/api/todos/${todoId}`);
      document.getElementById(todoId).remove();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  fetchTodos();
});
