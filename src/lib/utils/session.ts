import type { Load } from "@sveltejs/kit";

import * as cookie from "cookie";

import { dev } from "$app/env";
import { CAS_LOGIN_URL } from "$lib/api";


/**
 * Redirects on page load accordingly if the user its logged in or not
 * 
 * used in routes:
 *    - /               -> redirects to /sinai
 *    - /sinai          -> display page
 *    - /sinai/login    -> redirects to dst login
 *    - /sinai/registro -> display page
 */
export const redirect: Load = async function ({ fetch, session, url }) {

  const user = session.user;
  const professor = user?.professor;

  if (professor) { //Go to professor main view
    return {
      status: 302,
      redirect: `/sinai/actividades/profesor/${professor.id}`
    };
  } else if (user?.dean) { //Go to dean main view
    return {
      status: 302,
      redirect: "/sinai/actividades"
    };
  } else if (!user && !url.pathname.includes("sinai")) { // Go to main page "/sinai"
    return {
      status: 302,
      redirect: "/sinai"
    };
  } else if (!user && url.searchParams.has("ticket")) { // If login with DST success

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
      const { message, code } = await login.json();
      return {
        error: new Error(code + ' ' + message)
      };
    };
  } else if (!user && url.pathname.includes("login") && !url.searchParams.has("validated") && !dev) {
    // If not loged in redirects to DST login from "/sinai/login"

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
