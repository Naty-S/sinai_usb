import type { Load } from "@sveltejs/kit";


/**
 * Redirects on page load according if the user its logged in or not
 * 
 * used in routes:
 *    - /               -> redirects
 *    - /sinai          -> redirects
 *    - /sinai/login    -> display page
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
      redirect: "/sinai/actividades"
    };
  } else if (!session.user && !["login", "registro"].some(path => url.pathname.includes(path))) {
    return {
      status: 302,
      redirect: "/sinai/login"
    };
  } else {
    return {
      status: 200
    };
  };
};
