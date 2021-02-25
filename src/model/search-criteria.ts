import {Category} from "./category";

export class SearchCriteria {
  title = '';
  category: Category = new Category();
  location = '';
  description = '';
  publishDateFrom: Date = new Date(2018, 1, 1);
  publishDateTo: Date = new Date();
  minPrice = 0;
  maxPrice = 10000000;
  dataPerPage = 25;
  sortOrder = '';
}
