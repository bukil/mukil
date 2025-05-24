import { google } from 'googleapis'

// Check for required environment variables
const requiredEnvVars = {
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID
}

// Log environment variables (without sensitive data)
console.log('Environment check:', {
  hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
  hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
  hasSheetId: !!process.env.GOOGLE_SHEET_ID
})

// Validate environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars)
}

let sheets
let SPREADSHEET_ID

try {
  // Initialize Google Sheets API
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  sheets = google.sheets({ version: 'v4', auth })
  SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID
} catch (error) {
  console.error('Error initializing Google Sheets:', error)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check if all required environment variables are set
  if (missingEnvVars.length > 0) {
    console.error('Missing environment variables:', missingEnvVars)
    return res.status(500).json({ 
      message: 'Server configuration error',
      error: 'Missing required environment variables',
      missingVars: missingEnvVars
    })
  }

  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        error: 'All fields are required'
      })
    }

    const timestamp = new Date().toISOString()

    // Log the attempt to append data
    console.log('Attempting to append data to sheet:', {
      sheetId: SPREADSHEET_ID,
      timestamp,
      name,
      email,
      subject
    })

    // Append the form data to the Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[timestamp, name, email, subject, message]],
      },
    })

    console.log('Sheet update response:', response.status)

    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    // Detailed error logging
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      response: error.response?.data
    })
    
    return res.status(500).json({ 
      message: 'Failed to send message',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? {
        name: error.name,
        code: error.code,
        response: error.response?.data
      } : undefined
    })
  }
} 