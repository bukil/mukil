import { google } from 'googleapis'

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body
    const timestamp = new Date().toISOString()

    // Append the form data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E', // Adjust based on your sheet structure
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[timestamp, name, email, subject, message]],
      },
    })

    res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Failed to send message' })
  }
} 