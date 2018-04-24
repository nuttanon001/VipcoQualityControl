import { OnInit, Input } from "@angular/core";

export abstract class BaseViewComponent<Model> implements OnInit {
  // constructor
  constructor() { }
  // paramater
  public _displayValue: Model;
  public titelLabel: string;
  // input
  @Input("displayValue")
  set displayValue(setInput: Model) {
    this._displayValue = setInput;
    if (setInput) {
      setTimeout(() => {
        this.onLoadMoreData(setInput);
      }, 150);
    }
  }
  get displayValue(): Model { return this._displayValue; }
  // on hook init
  ngOnInit(): void { }
  // on load more data
  abstract onLoadMoreData(value: Model): void;
}
