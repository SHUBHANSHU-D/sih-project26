const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();

      errorMessage =
        errorData.detail ||
        errorData.message ||
        errorMessage;
    } catch {
      // Backend did not return JSON
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}


/*
  Simple backend connection test.
  The endpoint must exist in your teammate's backend.
*/
async function testBackendConnection(endpoint = "/") {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`
    );

    if (!response.ok) {
      throw new Error(
        `Backend responded with status ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error(
      "Backend connection failed:",
      error
    );

    return false;
  }
}


export {
  API_BASE_URL,
  apiRequest,
  testBackendConnection,
};