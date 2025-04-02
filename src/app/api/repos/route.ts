import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    console.log("attempting");
    const res = await axios.get(`https://api.github.com/users/${username}/repos`);
    console.log("here");
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}