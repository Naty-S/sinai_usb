import type { profesor } from "@prisma/client";


export const init = function () {

  return {
    search_type: "professor",
    search: 1223 // 1st ordered by surname
  };
};
