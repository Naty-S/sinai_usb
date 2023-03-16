import type { Load } from "@sveltejs/kit";

import * as api from "$lib/api";


/**
 * Redirects on page load according if the user its logged in or not
 * 
 * used in routes:
 *    - /               -> redirects
 *    - /sinai          -> redirects
 *    - /sinai/login    -> redirects to dst login
 *    - /sinai/registro -> display page
 */
export const redirect: Load = async function ({ session, url }) {

  if (session.user?.professor) {
    return {
      status: 302,
      redirect: `/sinai/actividades/profesor/${session.user.email}`
    };
  } else if (session.user?.dean) {
    return {
      status: 302,
      redirect: "/sinai/validaciones/nuevos_profesores"
    };
  } else if (!session.user && !["login", "registro"].some(path => url.pathname.includes(path))) {
    return {
      status: 302,
      redirect: "/sinai/login"
    };
  } else if (!session.user && url.searchParams.has("ticket")) {

    const cas_ticket = url.searchParams.get("ticket");

    return {
      status: 200
    };
  } else if (!session.user && url.pathname.includes("login")) {
    return {
      status: 302,
      redirect: "https://secure.dst.usb.ve/login?service=http%3A%2F%2Flocalhost:3000%2Fsinai%2Flogin"
    };
  } else {
    return {
      status: 200
    };
  };
};
