export function GetCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const cookies = document.cookie.split(';');
  console.log('Cookies:', cookies);
  console.log('All cookies:', document.cookie);
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }

  return undefined;
}
