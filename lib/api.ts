const API_BASE_URL = "http://45.144.52.219:5000/api"

export interface RegisterRequest {
  username: string
  password: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface ApiResponse<T = any> {
  message?: string
  data?: T
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "Content-Type",
      ...options.headers,
    },
    mode: "cors",
    credentials: "omit",
    ...options,
  }

  console.log("Making request to:", url)
  console.log("Request config:", JSON.stringify(config, null, 2))

  try {
    const response = await fetch(url, config)

    console.log("Response received:")
    console.log("- Status:", response.status)
    console.log("- Status Text:", response.statusText)
    console.log("- OK:", response.ok)
    console.log("- Headers:", Object.fromEntries(response.headers.entries()))

    if (response.ok) {
      try {
        const contentType = response.headers.get("content-type")
        console.log("Content-Type:", contentType)

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json()
          console.log("Response JSON data:", data)
          return data
        } else {
          const text = await response.text()
          console.log("Response text:", text)
          return { message: text || "Success" } as T
        }
      } catch (parseError) {
        console.log("Failed to parse response, but status was OK")
        return { message: "Success" } as T
      }
    } else {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`

      try {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } else {
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
      } catch {}

      console.log("Error response:", errorMessage)
      throw new ApiError(response.status, errorMessage)
    }
  } catch (error) {
    console.error("Request failed with error:", error)

    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof TypeError) {
      if (error.message.includes("Failed to fetch")) {
        throw new ApiError(
          0,
          "Network error: Unable to connect to server. This might be a CORS issue or the server is not running.",
        )
      }
      if (error.message.includes("NetworkError")) {
        throw new ApiError(0, "Network error: Check your internet connection and server availability.")
      }
    }

    throw new ApiError(0, `Request failed: ${error.message}`)
  }
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<ApiResponse> => {
    console.log("🔐 Registering user:", data.username)
    return apiRequest("/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  login: async (data: LoginRequest): Promise<ApiResponse> => {
    console.log("🔑 Logging in user:", data.username)
    return apiRequest("/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

export const testConnection = async (): Promise<boolean> => {
  try {
    console.log("🧪 Testing server connection...")
    const response = await fetch(API_BASE_URL.replace("/api", ""), {
      method: "GET",
      mode: "no-cors",
    })
    console.log("Connection test response:", response)
    return true
  } catch (error) {
    console.error("Connection test failed:", error)
    return false
  }
}

export const testApiWithExample = async () => {
  try {
    console.log("🧪 Testing API with example data (test4/1234)...")
    const result = await authApi.login({
      username: "test4",
      password: "1234",
    })
    console.log("✅ Test result:", result)
    return result
  } catch (error) {
    console.error("❌ Test failed:", error)
    throw error
  }
}
