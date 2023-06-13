/// <reference types="@sveltejs/kit" />

/**
 * Items displayed in the submenus
 */
export type submenu_item = {
  href: string,
  click: MouseEventHandler<HTMLAnchorElement>,
  name: string
};
