import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { Activity } from "$types/db/activities";
import PrismaClient from "$lib/prisma";
import { acts_kinds_by_year, acts_counts } from "$utils/backend";


const prisma = new PrismaClient();

/**
 * 
 */
export const get: RequestHandler = async function({ request, params }) {

  let status = 500;
  let headers = { location: '/' };
  let body = {};

  try {
    const _user = await prisma.usuario.findUniqueOrThrow({
      where: {
        login: params.user
      },
      include: {
        administrador: true,
        profesor: {
          include: {
            ppi: true,
            grupos_investigacion: true,
            historico_grupos: true,
            coordinacion: true,
            division: true,
            jefe_departamentos: true,
            representante_departamentos: true,
          }
        },
        actividades: {
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
        }
      }
    });

    const _profesor = _user.profesor;
    const _activities: Activity[] = _user.actividades.map(a => {
      
      let kind_name = '';
      let kind_info ;
      
      // removes null's activities kinds
      Object.keys(a).slice(-16).map(kind => {
        if (!a[kind as keyof typeof a]) {
          delete a[kind as keyof typeof a]
        } else {
          kind_name = kind
          kind_info = a[kind as keyof typeof a]
        };
      });
      
      return {
        ...a,
        kind_name,
        kind_info
      };
    });
    
    if (_profesor) {
      body = {
        email: _profesor.correo
        , profesor_profile: {
          id: _profesor.id
          , name1: _profesor.nombre1
          , name2: _profesor.nombre2
          , surname1: _profesor.apellido1
          , surname2: _profesor.apellido2
          , category: _profesor.categoria
          , dedication: _profesor.dedicacion
          , department_id: _profesor.departamento
          , department_name: ''
          , groups: []
          , diploma: _profesor.diploma_tipo
          , diploma_university: _profesor.diploma_universidad
          , ppi_number: _profesor.ppi[0].numero
          , ppi_level: _profesor.ppi[0].nivel
          , profile: _profesor.perfil
          , page: _profesor.url
          , research_lines: _profesor.lineas_investigacion
        }
        , coord_id: _profesor.coordinacion?.id
        , coord_name: _profesor.coordinacion?.nombre
        , division_id: _profesor.division?.id
        , division_name: _profesor.division?.nombre
        , is_coord_chief: _profesor.coordinacion !== null
        , is_dep_chief: _profesor.jefe_departamentos.length > 0
        , is_dep_representative: _profesor.representante_departamentos.length > 0
        , is_division_chief: _profesor.division !== null
        , is_dean: false
        , activities: {
          profesor_activities: {
            acts_kinds_by_year: acts_kinds_by_year(_activities),
            acts_counts: acts_counts(_activities)
          }
        }
      };
    } else if (_user.administrador) {
      console.log("Admin, todas las actividades")
    } else {
      console.log("No es profesor ni admin")
    };

    status = 200;
    headers = {
      location: "/actividades/profesor"
    }

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
  }

  return {
    status,
    headers,
    body
  };
};
