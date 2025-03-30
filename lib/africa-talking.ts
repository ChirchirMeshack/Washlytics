// This is a utility file for interacting with the Africa's Talking API

// Africa's Talking API credentials would typically be stored in environment variables
const AT_USERNAME = process.env.AT_USERNAME || "sandbox"
const AT_API_KEY = process.env.AT_API_KEY || ""

// Base URL for Africa's Talking API
const BASE_URL = "https://api.africastalking.com/version1"

/**
 * Send SMS to a list of recipients
 * @param recipients Array of phone numbers
 * @param message SMS message content
 * @param from Sender ID (optional)
 * @returns Promise with the API response
 */
export async function sendSMS(recipients: string[], message: string, from?: string) {
  try {
    const response = await fetch(`${BASE_URL}/messaging`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
      body: new URLSearchParams({
        username: AT_USERNAME,
        to: recipients.join(","),
        message,
        ...(from && { from }),
      }),
    })

    if (!response.ok) {
      throw new Error(`Africa's Talking API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending SMS:", error)
    throw error
  }
}

/**
 * Fetch SMS delivery reports
 * @param messageId Optional message ID to filter reports
 * @returns Promise with the API response
 */
export async function fetchDeliveryReports(messageId?: string) {
  try {
    const params = new URLSearchParams({
      username: AT_USERNAME,
      ...(messageId && { messageId }),
    })

    const response = await fetch(`${BASE_URL}/messaging?${params.toString()}`, {
      method: "GET",
      headers: {
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Africa's Talking API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching delivery reports:", error)
    throw error
  }
}

/**
 * Fetch SMS subscription data
 * @param shortCode The short code for which to fetch subscription data
 * @param keyword The keyword for which to fetch subscription data
 * @param lastReceivedId Optional ID of the last received subscription
 * @returns Promise with the API response
 */
export async function fetchSubscriptions(shortCode: string, keyword: string, lastReceivedId?: number) {
  try {
    const params = new URLSearchParams({
      username: AT_USERNAME,
      shortCode,
      keyword,
      ...(lastReceivedId && { lastReceivedId: lastReceivedId.toString() }),
    })

    const response = await fetch(`${BASE_URL}/subscription?${params.toString()}`, {
      method: "GET",
      headers: {
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Africa's Talking API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    throw error
  }
}

/**
 * Create a premium subscription
 * @param phoneNumber The phone number to subscribe
 * @param shortCode The short code to subscribe to
 * @param keyword The keyword to subscribe to
 * @returns Promise with the API response
 */
export async function createSubscription(phoneNumber: string, shortCode: string, keyword: string) {
  try {
    const response = await fetch(`${BASE_URL}/subscription/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
      body: new URLSearchParams({
        username: AT_USERNAME,
        phoneNumber,
        shortCode,
        keyword,
      }),
    })

    if (!response.ok) {
      throw new Error(`Africa's Talking API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating subscription:", error)
    throw error
  }
}

/**
 * Delete a premium subscription
 * @param phoneNumber The phone number to unsubscribe
 * @param shortCode The short code to unsubscribe from
 * @param keyword The keyword to unsubscribe from
 * @returns Promise with the API response
 */
export async function deleteSubscription(phoneNumber: string, shortCode: string, keyword: string) {
  try {
    const response = await fetch(`${BASE_URL}/subscription/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
      body: new URLSearchParams({
        username: AT_USERNAME,
        phoneNumber,
        shortCode,
        keyword,
      }),
    })

    if (!response.ok) {
      throw new Error(`Africa's Talking API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting subscription:", error)
    throw error
  }
}

/**
 * Fetch user wallet balance
 * @returns Promise with the API response
 */
export async function fetchBalance() {
  try {
    const response = await fetch(`${BASE_URL}/user?username=${AT_USERNAME}`, {
      method: "GET",
      headers: {
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Africa's Talking API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching balance:", error)
    throw error
  }
}

/**
 * Process SMS template with variables
 * @param template The SMS template with variables in {{variable}} format
 * @param variables Object containing variable values
 * @returns Processed SMS message
 */
export function processTemplate(template: string, variables: Record<string, string>) {
  return template.replace(/{{([^}]+)}}/g, (match, variable) => {
    const variableName = variable.trim()
    return variables[variableName] || match
  })
}

