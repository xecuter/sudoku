import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
  pressing: boolean;
  longPressing: boolean;
  timeout: any;
  interval: number;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onLongPress = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onLongPressing = new EventEmitter();

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(event);
      this.interval = setInterval(() => {
        this.onLongPressing.emit(event);
      }, 50);
    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.longPressing = false;
    this.pressing = false;
  }

  constructor() { }

}
