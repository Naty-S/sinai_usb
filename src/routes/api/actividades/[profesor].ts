import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { Activity, ActivityKind, YearActivities } from "$types/db/activities";
import PrismaClient from "$lib/prisma";
import { group_by } from "$utils/backend";


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
export const get: RequestHandler = async function({ request, params }) {

  let body = {};
  let status = 500;

  try {
    // Find profesor's activities
    const _acts = await prisma.actividad.findMany({
      where: {
        creada_por: params.profesor
      },
      include: {
        autores_usb: true,
        autores_externos: true,
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
    const acts: Activity[] = _acts.map( a => {

      const k = _act_kind.find(k => k.id === a.id);
      
      if (k) {
        // TODO: tell typescript k is not undefined
        // Remove id prop
        delete k.id;
        // _k.shift();
        
        let _k = Object.entries(k);
        let _kind_name: string = '';
        let _kind_info: ActivityKind = undefined;
  
        for (const [k_name, k_info] of _k) {
          if (k_info) {
            _kind_name = k_name,
            _kind_info = k_info // TODO: tell typescript id its not in _k
          }
        }
  
        return {
          ...a,
          kind_name: _kind_name,
          kind_info: _kind_info
        }
      } else {
        // This shouldn't happen
        throw new Error("Couldn't find activity kind. This activity doesn't have kind info");
      }
    });

    // group kinds of activities by year
    const acts_kinds_by_year: YearActivities[] = Object.entries(group_by("fecha_creacion", acts))
      .map( ([_year, _acts]) => {
        return {
          year: _year,
          acts: group_by("kind_name", _acts)
        };
      });
    
    // count kinds of activities by year
    const acts_counts = Object.entries(group_by("kind_name", acts))
      .map(([_kind, _acts]) => {
        const years = acts_kinds_by_year.map(a => a["year"]);
        const acts_by_year = group_by("fecha_creacion", _acts)
        const _years_counts: number[] = []

        // fill empty years without activities
        years.map(y => {
          if (!acts_by_year[y]) {
            acts_by_year[y] = []
          }
        });

        // count activities by year
        Object.entries(acts_by_year).map( ([_, arr]) => _years_counts.push(arr.length) )
        
        return {
          kind: _kind,
          years_counts: _years_counts
        };
      });

    status = 200;
    body = {
      acts_kinds_by_year,
      acts_counts
    };

  } catch (e) {
    // TODO: 
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (e.code === 'P1012') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        );
      };
    };
    throw e;
  };

  return {
    status,
    body
  };
};
