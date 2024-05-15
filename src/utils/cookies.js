import nookies from "nookies";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export function setCookiesValues(keyName, data) {
	// Regular expression to match various date formats

	try {
		setCookie(null, keyName, JSON.stringify(data), {
			maxAge: 1800,
			path: "/",
		});

		return true;
	} catch (error) {
		return false;
	}

	return {};
}

export function getCookieValues(keyName) {
	// Regular expression to match various date formats

	try {
		const cookies = parseCookies();

		const returnValue = JSON.parse(cookies?.[keyName]); // Access the value using dynamic keyName

		return returnValue;
	} catch (error) {
		return null;
	}
}

export function removeCookie( key) {
    const cookies = parseCookies();
    if (cookies[key]) {
      // Delete the 'token' cookie
      destroyCookie(null, key);
      console.log('Cookie removed successfully');
    } else {
      console.log('Cookie does not exist');
    }
      // If we are on the client side, remove the cookie directly
      destroyCookie(null, key);
    
  }
  