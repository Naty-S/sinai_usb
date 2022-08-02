/// <reference types="@sveltejs/kit" />

export type User = {
  id: number
  email: string
  profile: {
    name1: string
    name2: string
    surname1: string
    surname2: string
    profile: string
    page: string
    category: string
    dedication: string
    groups: Array<string>
    department: string
    diploma: string
    diploma_university: string
    ppi_number: number
    ppi_level: string
    research_lines: Array<string>
  }
  coord_id: number
  coord_name: string
  division_id: number
  division_name: string
  is_coord_chief: boolean
  is_dep_chief: boolean
  is_dep_representative: boolean
  is_division_chief: boolean
  is_dean: boolean
};
