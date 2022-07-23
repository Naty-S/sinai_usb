import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import PrismaClient from "$lib/prisma";

import type { Actividad, ActivityKind, YearActivities } from "$types/db/actividades";

const prisma = new PrismaClient();

/**
 * This function its called when the '/actividades' page its loaded
 * (see 'load' function in 'routes/actividades/index.svelte')
 * 
 * Manages the load of the data for the activites to be displayed for the profesor
 * 
 * @param param0 - 
 * @returns {Object<number, YearActivities[]>} The status code and the activities grouped by year and kind
 */
export const get: RequestHandler = async ({ request, params }) => {

  let body = {};
  let status = 500;

  // select * from actividades inner join (especializaciones) where creada_por=<correo profesor>

  try {
    // Find profesor's activities
    const _acts = await prisma.actividad.findMany({
      where: {
        creada_por: params.profesor
      }
    });

    // Find activities kind
    const _act_kind = await prisma.actividad.findMany({
      where: {
        creada_por: params.profesor
      },
      select: {
        id: true,
        articulos_revistas: true,
        capitulos_libros: true,
        composiciones: true,
        eventos: true,
        exposiciones: true,
        grabaciones: true,
        informes_tecnicos: true,
        libros: true,
        memorias: true,
        partituras: true,
        patentes: true,
        premios: true,
        premios_bienales: true,
        proyectos_grado: true,
        proyectos_investigacion: true,
        recitales: true
      }
    });

    // Join activities with the info of the kind
    const acts: Actividad[] = _acts.map(a => {

      const k = _act_kind.find(k => k.id === a.id);
      // // Remove id prop
      delete k.id;
      // _k.shift();
      
      let _k = Object.entries(k);
      let _kind_name = '';
      let _kind_info: ActivityKind = undefined;

      for (const [k_name, k_info] of _k) {
        if (k_info) {
          _kind_name = k_name,
          _kind_info = k_info
        }
      }

      return {
        ...a,
        kind_name: _kind_name,
        kind_info: _kind_info
      }
    });

    /**
     * Groups activities by the given prop.
     * Used to group by year or kind
     * 
     * @param {Actividad[]} objectArray - The activities to group
     * @param {string} prop - The prop to group by
     * @returns {Record<string, Actividad[]>} The activities grouped by the given prop
     */
    const group_by: (objectArray: Actividad[] | any, prop: string) => Record<string, Actividad[]> =
      (objectArray: Actividad[] | any, prop: string) => {

        return objectArray.reduce((acc: Actividad, obj: Actividad) => {
          let key = prop === "fecha_creacion" ? obj[prop].getFullYear() : obj[prop]

          if (!acc[key]) {
            acc[key] = []
          }

          acc[key].push(obj)

          return acc
        }, {})
      };

    // Group by year-kind
    const acts_by_year: YearActivities[] =
      Object.entries(group_by(acts, "fecha_creacion"))
        .map(([_year, _acts]) => {
          return { year: _year, acts: group_by(_acts, "kind_name") }
        });

    status = 200;
    body = acts_by_year;

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (e.code === 'P1012') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    throw e
  }

  return {
    status,
    body
  }
}
