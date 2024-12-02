import axios from "axios";
import Cookies from "js-cookie";
import { deleteCookie } from "./cookies";

// FETCHING TOKEN FROM COOKIE
export const token = Cookies.get("chat-token");

export const getRequest = async (url) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}${url}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("chat-token");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_WEB_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

export const postRequest = async (props) => {
  try {
    const response = await axios?.post(
      `${import.meta.env.VITE_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("chat-token");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_WEB_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    throw error;
  }
};

export const putRequest = async (props) => {
  try {
    const response = await axios?.put(
      `${import.meta.env.VITE_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("chat-token");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_WEB_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    throw error;
  }
};

export const patchRequest = async (props) => {
  try {
    const response = await axios?.patch(
      `${import.meta.env.VITE_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("chat-token");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_WEB_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    throw error;
  }
};

export const deleteRequest = async (url) => {
  try {
    const confirmed = await confirmDeletion(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}${url}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      return response;
    } else {
      throw "An error occurred while deleting the item";
    }
  } catch (error) {
    if (error?.response?.status) {
      if (error.response.status === 401) {
        deleteCookie("chat-token");
        window != undefined &&
          (window.location.href = `${import.meta.env.VITE_WEB_SIGNUP_URL}`);
        console.error("Unauthorized: Redirecting to login page");
      }
    }
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

export const noTokenGetRequest = async (url) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}${url}`
  );
  return response;
};

export const noTokenPostRequest = async (props) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}${props?.url}`,
    props?.cred
  );
  return response;
};

export const noTokenPutRequest = async (props) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}${props?.url}`,
    props?.cred
  );
  return response;
};

export const noTokenPatchRequest = async (props) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}${props?.url}`,
    props?.cred
  );
  return response;
};

export const noTokenDeleteRequest = async (url) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}${url}`
  );
  return response;
};

export const fileUpload = async (props) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("chat-token");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_WEB_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};

export const noTokenfileUpload = async (props) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${props?.url}`,
      props?.cred,
      {
        responseType: "arraybuffer",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};
