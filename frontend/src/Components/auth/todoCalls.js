import { API } from "../../backend";

export const getTodoByUserId = (userId, token) => {
  return fetch(`${API}/todos/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const createTodo = (userId, token, values) => {
  return fetch(`${API}/todo/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const editTodo = (userId, todoId, token, todo) => {
  return fetch(`${API}/todo/${todoId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(todo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTodoById = (userId, todoId, token) => {
  return fetch(`${API}/todo/${todoId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteTodo = (todoId, userId, token) => {
  return fetch(`${API}/todo/${todoId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
