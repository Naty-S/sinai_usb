import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { EntityActivities } from "$interfaces/activities";
import type { Activity } from "$types/activities";

import { format_activity_kind } from "$utils/formatting";
import { acts_kinds_by_year } from "$utils/grouping";
import { count_acts_kinds_by_year } from "$utils/maths";

import { prisma } from "../../_api";

/**
 * This function its called when the '/actividades/profesor' page its loaded
 * (see 'load' function in 'routes/actividades/profesor.svelte')
 * 
 * Manages the load of the data for the activites to be displayed for the professor
 * 
 * @param param0 - 
 * @returns {} The status code and the activities grouped by year and kind
 */
export const get: RequestHandler = async function({ request, params }) {

  let status = 500;
  let body: EntityActivities = {};

  try {
    // Find professor's activities
    const _acts = await prisma.actividad.findMany({
      where: {
        creada_por: params.email
      },
      include: {
        autores_usb: true,
        autores_externos: true,
        articulo_revista: true,
        capitulo_libro: true,
        composicion: true,
        evento: true,
        exposicion: true,
        grabacion: true,
        informe_tecnico: true,
        libro: true,
        memoria: true,
        partitura: true,
        patente: true,
        premio: true,
        premio_bienal: true,
        proyecto_grado: true,
        proyecto_investigacion: true,
        recital: true
      }
    });

    const activities: Activity[] = _acts.map( a => format_activity_kind(a) );

    status = 200;
    body = {
      entity: "Profesor",
      by_year: acts_kinds_by_year(activities, true),
      years_counts: count_acts_kinds_by_year(activities, true)
    };

  } catch (error) {
    // TODO: 
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === 'P1012') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        );
      };
    };
    throw error;
  };

  return {
    status,
    body
  };
};
