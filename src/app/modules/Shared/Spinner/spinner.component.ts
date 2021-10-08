import { Component, Input } from "@angular/core";
import { Selector } from "angular-bootstrap-md/lib/free/modals/modal.options";


@Component({
  selector:'spinner',
  styleUrls: ['./spinner.component.css'],
  templateUrl:'./spinner.component.html',
})
export class LoadingSpinner {
  @Input() public active: boolean = false;

}
