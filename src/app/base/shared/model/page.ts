export class Page<T> {
    totalPages: number = 0;
    totalElements: number = 0;
    pageNumber: number = 0;
    pageSize: number = 10;
    hasContent: boolean = false;
    hasNext: boolean = false;
    content: Array<T> = [];
}