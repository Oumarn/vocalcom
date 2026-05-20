import { NextResponse, type NextRequest } from 'next/server';

const VOCALCOM_AI_HOSTS = new Set(['vocalcom.ai', 'www.vocalcom.ai']);

export function proxy(request: NextRequest) {
  const rawHost = request.headers.get('host')?.toLowerCase() ?? '';
  const host = rawHost.split(':')[0];

  if (!VOCALCOM_AI_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === '/es-es' || pathname.startsWith('/es-es/')) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/es-es';
  url.search = '';
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!_next/|api/|assets/|favicon.ico|.*\\.).*)'],
};
