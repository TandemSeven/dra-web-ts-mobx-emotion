import { action, observable } from 'mobx';
import { CalendarView } from '#types';
import { DAILY } from '#constants';

export interface CalendarStoreProps {
	calendarView: CalendarView;
	changeCalendarView(calendarView: CalendarView): void;
}

export class CalendarStore {
	@observable calendarView: CalendarView = DAILY;
	@action
	changeCalendarView(calendarView: CalendarView) {
		this.calendarView = calendarView;
	}
}
