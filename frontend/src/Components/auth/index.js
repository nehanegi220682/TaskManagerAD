import { API } from "../../backend";

export const signup = user => {
  console.log("inside auth signup frontend");
  console.log("user is", user);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      console.log("got a res");
      return response.json();
    })
    .catch(err => console.log("err is " + err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    //i.e if window object is accessible to us
    localStorage.setItem("jwt", JSON.stringify(data)); //we're storing some info inside this jwt token
    next();
  }
};

//to signout, access window object, local storage and remove the jwt token
export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => {
        console.log("signout success");
        window.location.reload();
      })
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
