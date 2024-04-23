// export const loginFn = async ({ email, password }) => {
//   try {
//     const response = await fetch(`${backend_api}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     console.log(data);
//     console.log(response.status);
//     if (response.ok) {
//       toast.success(data.message);
//       return data;
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     toast.error("Something went wrong");
//   }
// };

// export const registerFn = async ({ username, email, password }) => {
//   try {
//     const response = await fetch(`${backend_api}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, email, password }),
//     });
//     const data = await response.json();
//     console.log(data);
//     console.log(response.status);
//     if (response.ok) {
//       toast.success(data.message);
//       return data;
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     toast.error("Something went wrong");
//   }
// };

// export const createStoryFn = async ({ category, slides }) => {
//   try {
//     const response = await fetch(`${backend_api}/stories`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ category, slides }),
//     });
//     const data = await response.json();
//     console.log(data);
//     console.log(response.status);
//     if (response.ok) {
//       toast.success(data.message);
//       return data;
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     toast.error("Something went wrong");
//   }
// };
