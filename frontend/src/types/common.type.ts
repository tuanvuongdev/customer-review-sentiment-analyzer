export interface IResponse<T> {
    message: string
    status: number
    metadata: T
}

export interface ISearchResponse<T> extends IResponse<IMetadata<T>> {
    metadata: IMetadata<T>
}

export interface IMetadata<T> {
    data: T[]
    pagination: IPagination
}

export interface IPagination {
    page: number
    limit: number
    total: number
    totalPages: number
}