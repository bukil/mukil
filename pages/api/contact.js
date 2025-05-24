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

    // Here you can add your email sending logic
    // For example, using nodemailer, SendGrid, or any other email service
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', { name, email, subject, message })

    // Return success response
    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return res.status(500).json({ message: 'Error processing your request' })
  }
} 