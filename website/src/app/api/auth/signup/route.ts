import { NextResponse } from 'next/server';
import { createUser } from '@/lib/neonAuth';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, age } = await request.json();
    const user = await createUser({ email, password, firstName, lastName, age });
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
