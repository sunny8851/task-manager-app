import axios from "axios";

export function getAllItemsAvailable(
  //   name: any,
  onSuccess: (response: any, name: any) => void,
  onFailure: (response: any) => void
  //   location: string
) {
  const x: any = localStorage.getItem("userData");
  const userData = JSON.parse(x);
  axios
    .get(`https://task-manager-backend2-5y57.onrender.com/api/tasks `, {
      headers: {
        email: userData ? userData.email : "",
        token: userData ? userData.token : "",
      },
    })
    .then((response) => {
      onSuccess(response.data, `${name}${location}`);
    })
    .catch(function (error) {
      onFailure(error);
    });
}
export function getItemById(
  id: any,
  onSuccess: (response: any, name: any) => void,
  onFailure: (response: any) => void
  //   location: string
) {
  const x: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(x);
  //   console.log(userData);
  axios
    .get(`https://task-manager-backend2-5y57.onrender.com/api/tasks/${id} `, {
      headers: {
        email: userData ? userData.email : "",
        token: userData ? userData.token : "",
      },
    })
    .then((response) => {
      onSuccess(response.data, `${name}${location}`);
    })
    .catch(function (error) {
      onFailure(error);
    });
}
export function submitTask(
  data: any,
  onSuccess: (response: any) => void,
  onFailure: (response: any) => void
  //   location: string
) {
  const x: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(x);
  //   console.log(userData);
  axios
    .post(
      `https://task-manager-backend2-5y57.onrender.com/api/tasks `,
      {
        ...data,
      },
      {
        headers: {
          email: userData ? userData.email : "",
          token: userData ? userData.token : "",
        },
      }
    )
    .then((response) => {
      onSuccess(response.data);
    })
    .catch(function (error) {
      onFailure(error);
    });
}
export function updateTask(
  id: any,
  data: any,
  onSuccess: (response: any) => void,
  onFailure: (response: any) => void
  //   location: string
) {
  const x: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(x);
  axios
    .put(
      `https://task-manager-backend2-5y57.onrender.com/api/tasks/${id}`,
      {
        ...data,
      },
      {
        headers: {
          email: userData ? userData.email : "",
          token: userData ? userData.token : "",
        },
      }
    )
    .then((response) => {
      onSuccess(response.data);
    })
    .catch(function (error) {
      onFailure(error);
    });
}
export function deleteTask(
  id: any,
  onSuccess: (response: any) => void,
  onFailure: (response: any) => void
  //   location: string
) {
  const x: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(x);
  axios
    .delete(`https://task-manager-backend2-5y57.onrender.com/api/tasks/${id}`, {
      headers: {
        email: userData ? userData.email : "",
        token: userData ? userData.token : "",
      },
    })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch(function (error) {
      onFailure(error);
    });
}
