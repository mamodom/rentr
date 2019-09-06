export default interface IPaginatedResponse<T> {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: T[];
}
