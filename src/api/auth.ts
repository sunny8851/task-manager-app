import axios from "axios";

const apiUrl = process.env.REACT_APP_API_KEY;
export function SignupApi(
  onSignUpSuccess: any,
  onSignUpFailure: any,
  values: any
) {
  console.log(values);
  axios
    .post(`https://task-manager-backend2-5y57.onrender.com/api/user/signup`, {
      ...values,
    })
    .then((response) => {
      onSignUpSuccess(response);
    })
    .catch((error) => {
      onSignUpFailure(error);
    });
}
export function LoginApi(
  onLoginSuccess: any,
  onLoginFailure: any,
  values: any
) {
  console.log(values);
  axios
    .post(`https://task-manager-backend2-5y57.onrender.com/api/user/login`, {
      ...values,
    })
    .then((response) => {
      onLoginSuccess(response);
    })
    .catch((error) => {
      onLoginFailure(error);
    });
}
