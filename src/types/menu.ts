/// <reference types="@sveltejs/kit" />

export type submenu_item = {
  href: string,
  click: MouseEventHandler<HTMLAnchorElement>,
  name: string
};
