import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

/**
 * EventService
 *
 * global event management
 *
 * eventService.pub(‘AUTH:LOGIN’, payload: any)
 * eventService.sub(‘AUTH:LOGIN’, (data) => {})
 *
 * unsubscribe in service or component when finished
 *    this.subscription = eventService.sub(....)
 *    this.subscription.unsubscribe();
 */
export class EventService {

    private _subject = new Subject<{event: string, payload: any}>();

    /**
     * 'call' an event,
     * 'listener' will process the 'called' event
     *
     * this.eventService.pub(‘AUTH:LOGIN’, {data: any})
     *
     * @param event
     * @param payload
     */
    public pub(event: string, payload: any): void {
        this._subject.next({event, payload});
    }

    /**
     * 'listen' when an event is 'called' and add a resolver
     *
     * this.eventService.sub(‘AUTH:LOGIN’, (data) => {})
     *
     * @param event
     * @param resolver
     */
    public sub(event: string, resolver: any): Subscription {
        return this._subject
            .pipe(
                filter((e: {event: string, payload: any}) => e.event === event),
                map((e: {event: string, payload: any}) => e.payload)
            ).subscribe(resolver);
    }
}

export default new EventService();
