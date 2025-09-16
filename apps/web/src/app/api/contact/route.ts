import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Submit to Strapi
    const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337'}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name,
          email,
          subject,
          message,
        }
      }),
    });

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      console.error('Strapi error:', {
        status: strapiResponse.status,
        statusText: strapiResponse.statusText,
        body: errorText
      });
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }

    const result = await strapiResponse.json();
    
    return NextResponse.json(
      { message: 'Message envoyé avec succès', data: result },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
