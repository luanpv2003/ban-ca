import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded.' },
        { status: 400, headers }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image.' },
        { status: 400, headers }
      );
    }

    // Create FormData for Coolmate API
    const coolmateFormData = new FormData();
    coolmateFormData.append('files[]', file, file.name);

    // Upload to Coolmate Media API
    const coolmateResponse = await fetch('https://media.coolmate.me/api/upload', {
      method: 'POST',
      body: coolmateFormData,
    });

    if (!coolmateResponse.ok) {
      const errorText = await coolmateResponse.text();
      console.error('Coolmate API Error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to upload image to Coolmate.' },
        { status: coolmateResponse.status, headers }
      );
    }

    const result = await coolmateResponse.json();

    if (result.success && result.data && result.data.length > 0) {
      const imageUrl = 'https://media.coolmate.me' + result.data[0].original;
      return NextResponse.json(
        { success: true, url: imageUrl },
        { status: 200, headers }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid response from Coolmate API.' },
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
