export interface Paciente{
    id: number;
    nombre: string;
    edad: number; // opcional
    sexo: string; //opcional
    razaId: number;
    propietarioId: number;
    fechaRegistro: Date; //se coloca en el api

    //Solo para el Dto, no se guardan
    propietario: string;
    raza: string;
}