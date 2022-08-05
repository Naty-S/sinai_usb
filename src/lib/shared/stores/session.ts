import { writable } from "svelte/store";

import type { User } from "$types/session/user";


const init_user: User = {
  email: '',
  is_dean: false
};

const create_user = function() {
  const { subscribe, set, update } = writable(init_user);

  return {
    subscribe,
    login: (_user: User) => set(_user),
    update_profile: () => {

    },
    create_activity: () => {

    },
    update_activity: () => {

    },
    validate_activity: () => {

    },
    delete_activity: () => {

    },
    logout: () => set(init_user)
  };
};

export const user = create_user();
