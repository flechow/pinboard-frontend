import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../infrastructure/validators/custom-validators";
import {Category} from "../../model/category";
import {SearchCriteria} from "../../model/search-criteria";
import {HttpService} from "../../service/http.service";
import {PagingInfo} from "../../model/paging-info";
import {Observable, Subscription} from "rxjs";


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    dropped = false;
    categories: Category[] = [];
    @Output() searchData = new EventEmitter<SearchCriteria>();
    @Output() searchBarExpanded = new EventEmitter<boolean>();
    pagingInfo: PagingInfo = new PagingInfo();
    @Input() pagingInfoInput: any;
    private pagingInfoSubscription: Subscription = new Subscription();

    constructor(private router: Router, private formBuilder: FormBuilder, private httpService: HttpService) {
        this.formGroup = this.formBuilder.group(
            {
                title: ['', [Validators.maxLength(64)]],
                category: ['', [Validators.maxLength(64)]],
                location: ['', [Validators.maxLength(128)]],
                description: ['', [Validators.maxLength(128)]],
                publishDateFrom: [''],
                publishDateTo: [''],
                minPrice: [0, Validators.min(0)],
                maxPrice: [1001, Validators.min(0)],
                dataPerPage: ['', [Validators.min(10), Validators.max(100)]]
            }, {validators: [CustomValidators.PriceValidator, CustomValidators.DateValidator]});

        this.categories = this.httpService.getCategoriesMock();
    }

    ngOnInit() {
        this.pagingInfoSubscription = this.pagingInfoInput.subscribe((pagingInfo: PagingInfo) => this.pagingInfoChanged(pagingInfo));
    }

    dropdownStateChange() {
        this.dropped = !this.dropped;
        this.searchBarExpanded.emit(this.dropped);
    }

    isFormValid() {
        return this.formGroup.valid;
    }

    getFormData() {
        if (this.isFormValid()) {
            const data: SearchCriteria = this.formGroup.value;
            data.category = this.formGroup.get('category')?.value;
            if (this.pagingInfo) {
                data.dataPerPage = this.pagingInfo.pageSize;
            }
            this.searchData.emit(data);
        }
    }

    ngOnDestroy() {
        this.pagingInfoSubscription.unsubscribe();
    }

    private pagingInfoChanged(pagingInfo: PagingInfo) {
        this.pagingInfo = pagingInfo;
        this.getFormData();
    }
}
