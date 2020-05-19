import { User } from '@models/user';
import { Trip } from '@models/trip';
import { BehaviorSubject } from 'rxjs';

interface Storage {
    isLoading: BehaviorSubject<boolean>;
    isSidebarOpen: BehaviorSubject<boolean>;
    userProfile: BehaviorSubject<User>;
    activeTrip: BehaviorSubject<Trip>;
}

export { Storage };
