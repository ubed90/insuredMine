import { BehaviorSubject, Observable, distinctUntilChanged, pluck } from "rxjs";
import { User } from "./app/auth/shared/model/user.model";


export interface AppState {
    user: User | undefined,
    users: User[] | undefined,
    [key: string]: any 
}


const state: AppState = {
    user: undefined,
    users: undefined
}

export class Store {

    private subject = new BehaviorSubject<AppState>(state);
    private store = this.subject.asObservable().pipe(
        distinctUntilChanged()
    )


    get value() {
        return this.subject.value;
    }

    select<T>(name: string): Observable<T> {
        return this.store.pipe(
            pluck(name)
        );
    }

    set(name: string, state: any) {
        this.subject.next({ ...this.value, [name]: state });
    }
}