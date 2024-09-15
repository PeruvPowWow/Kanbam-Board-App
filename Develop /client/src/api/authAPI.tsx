import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    // Make the POST request to the login route
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    // Parse the JSON response
    const data = await response.json();

    // Save the JWT token to localStorage
    localStorage.setItem("token", data.token);

    return data; // Return the data (optional, in case you need it later)
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Throw the error so the calling function can handle it
  }
};

export { login };
