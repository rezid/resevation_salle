import {
  Component, OnInit, OnDestroy,
  Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef
} from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Reservation } from '../../core/models/reservation/reservation';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  @Input() reservationList$: Observable<Reservation[]>;
  @Output() dataClickedEvent: EventEmitter<Date>;



  observer: Subscription;

  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  view = 'month';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.dataClickedEvent = new EventEmitter<Date>();
  }

  ngOnInit() {
    this.activeDayIsOpen = false;
    this.observer = this.reservationList$.subscribe(reservation_list => {
      reservation_list.map(reservation => {

        this.events.push({
          start: new Date(reservation.start_date),
          end: new Date(reservation.end_date),
          title: 'Deja reservé pour cette date',
          color: colors.blue,
        });

        this.refresh.next();

        // this.changeDetectorRef.detectChanges();
      });
    });
  }

  ngOnDestroy(): void {
    this.observer.unsubscribe();
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(`Date clicked in calendar view: ${date}`);
    this.dataClickedEvent.emit(date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  addEvent() {
  }

  getMonth(monthNumber) { // 1 = January
    const monthNames = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'May', 'Juin',
      'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
    return monthNames[monthNumber];
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.events.length && day.inMonth) {
        day.cssClass = 'reserved-cell';
      }
    });
  }

}
