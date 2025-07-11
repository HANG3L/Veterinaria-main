export interface Consulta{
    id: number;
    motivo: string;
    observaciones: string;
    pacienteId: number;
    fecha: Date; //Se coloca en el api

    //Solo para el Dto, no se guardan
    paciente: string;
    raza: string;
    fechaTexto: string;
}