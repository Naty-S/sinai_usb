import { writable } from "svelte/store";

import type { User } from "$types/session/user";


const init_user: User = {
  email: ''
  , profesor_profile: {
    id: -1
    , name1: ''
    , name2: ''
    , surname1: ''
    , surname2: ''
    , category: ''
    , dedication: ''
    , department_id: -1
    , department_name: ''
    , groups: []
    , diploma: ''
    , diploma_university: ''
    , ppi_number: -1
    , ppi_level: ''
    , profile: ''
    , page: ''
    , research_lines: []
  }
  , coord_name: ''
  , division_id: -1
  , division_name: ''
  , is_coord_chief: false
  , is_dep_chief: false
  , is_dep_representative: false
  , is_division_chief: false
  , is_dean: false
  , activities: {}
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
