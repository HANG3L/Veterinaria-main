export interface ApiResponse {
    message: string;
    type: TypeResponse;
}

export interface ApiResponseData<TData> extends ApiResponse{
    data: TData;
}

export enum TypeResponse{
    Ok = 1,
    Warning = 2,
    NotFound = 3,
    Error = 4
}