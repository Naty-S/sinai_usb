

export const init = function () {

  return {
    professor: {
      nombre1: '',
      nombre2: null,
      apellido1: '',
      apellido2: null,
      cedula: '',
      correo: '',
      sexo: 'F',
      categoria: "Agregado",
      condicion: "Contratado",
      dedicacion: "Convencional",
      diploma_tipo: "Lic_",
      diploma_universidad: '',
      departamento: '2',
      perfil: '',
      lineas_investigacion: [],
      url: null,
      // grupos_investigacion: [],
    },
    ppi: {
      anio: 2022,
      nivel: "Candidato",
      numero: 0,
    },
    password: '',
    confirm_password: ''
  };
};
