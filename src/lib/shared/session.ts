import type { Load } from "@sveltejs/kit";

import * as cookie from "cookie";

import { CAS_LOGIN_URL } from "$lib/api";


/**
 * Redirects on page load according if the user its logged in or not
 * 
 * used in routes:
 *    - /               -> redirects
 *    - /sinai          -> redirects
 *    - /sinai/login    -> redirects to dst login
 *    - /sinai/registro -> display page
 */
export const redirect: Load = async function ({ fetch, session, url }) {

  if (session.user?.professor) {
    return {
      status: 302,
      redirect: `/sinai/actividades/profesor/${session.user.email}`
    };
  } else if (session.user?.dean) {
    return {
      status: 302,
      redirect: "/sinai/actividades"
    };
  } else if (!session.user && !["login", "registro"].some(path => url.pathname.includes(path))) {
    return {
      status: 302,
      redirect: "/sinai/login"
    };
  } else if (!session.user && url.searchParams.has("ticket")) {

    const origin = url.origin.split("://")[1];
    const cas_ticket = url.searchParams.get("ticket");
    const login = await fetch(`/api/auth/login/${origin}/${cas_ticket}`);
    
    if (login.ok) {
      const cookies = cookie.parse(login.headers.get("set-cookie") || '');
      const jwt = cookies.jwt && Buffer.from(cookies.jwt, "base64").toString("utf-8");

      return {
        status: 302,
        redirect: `/sinai/login?validated=${jwt}`
      }
    } else {
      const { message } = await login.json();
      return {
        error: new Error(message)
      };
    };


  } else if (!session.user && url.pathname.includes("login") && !url.searchParams.has("validated")) {

    const origin = url.origin.split("://")[1];
    const CAS_SERVICE_BASE_URL = `http%3A%2F%2F${origin}%2Fsinai`;
    const CAS_SERVICE_URL = `${CAS_SERVICE_BASE_URL}%2Flogin`;

    return {
      status: 302,
      redirect: `${CAS_LOGIN_URL}?service=${CAS_SERVICE_URL}`
    };
  } else {
    return {
      status: 200
    };
  };
};
