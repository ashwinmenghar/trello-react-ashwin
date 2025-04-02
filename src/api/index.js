import axios from "axios";
// https://api.trello.com/1/members/me/boards?key=b0f0af4b05df6b0caf13eb478e25c690&token=ATTA0a123c7ba654d8700d745036fb176a4dc58e625094c4493066a9d376c0e937796AE8B387

const keyValue = import.meta.env.VITE_API_KEY;
const tokenValue = import.meta.env.VITE_TOKEN;
const baseURL = import.meta.env.VITE_BASE_URL;

export const apiV1Instance = axios.create({
  baseURL,
  responseType: "json",
});

apiV1Instance.interceptors.request.use((request) => {
  if (tokenValue && keyValue) {
    request.params = {
      ...request.params,
      key: keyValue,
      token: tokenValue,
    };
  }
  return request;
});

// const checkStatus = (response) => {
//   console.log(response.statusCode);
// };

// export async function getAllBoard() {
//   try {
//     const response = await axios.get(
//       `${URL}/members/me/boards?key=${keyValue}&token=${tokenValue}`
//     );
//     return checkStatus(response);
//   } catch (error) {
//     throw new Error(`There was an error fetching all boards: ${error.message}`);
//   }
// }
