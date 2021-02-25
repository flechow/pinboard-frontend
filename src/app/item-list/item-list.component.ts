import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PagingInfo} from "../../model/paging-info";
import {Offer} from "../../model/offer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() offers: Array<Offer> = [];
  @Output() searchCriteriaChanged = new EventEmitter<PagingInfo>();
  pagingInfo: PagingInfo = new PagingInfo();
  displayStyle: 'list' | 'grid' = 'list';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.emitSearchCriteriaChange();
  }

  flagChange(displayStyle: 'list' | 'grid') {
    this.displayStyle = displayStyle;
  }

  emitSearchCriteriaChange() {
    this.searchCriteriaChanged.emit(this.pagingInfo);
  }

  pageSizeChange() {
    this.pagingInfo.currentPage = 1;
    this.emitSearchCriteriaChange();
  }

  currentPageChanged(currentPage: number) {
    if (currentPage > 0 && currentPage <= this.pagingInfo.totalPages) {
      this.pagingInfo.currentPage = currentPage;
    }
    this.emitSearchCriteriaChange();
  }

  showOffer(offer: Offer) {
    return this.router.navigate(['/preview'], {
      state: {data: JSON.stringify(offer), previewOnly: false}
    });
  }
}
