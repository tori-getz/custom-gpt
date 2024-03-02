export interface IPaginationResponse<T> {
  data: Array<T>;
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

export interface IPaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: Array<string[]>;
  searchBy: Array<String>;
  search: string;
  select: Array<string>;
  filter: any;
}

export interface IPaginationLinks {
  first: string;
  previous: string;
  current: string;
  next: string;
  last: string;
}
