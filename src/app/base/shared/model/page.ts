export class Page<T> {
    totalPages = 0;
    totalElements = 0;
    pageNumber = 0;
    pageSize = 10;
    hasContent = false;
    hasNext = false;
    content: Array<T> = [];
}
