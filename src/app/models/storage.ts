import { User } from '@models/user';
import { BehaviorSubject } from 'rxjs';

interface Storage {
    isLoading: BehaviorSubject<boolean>;
    userProfile: BehaviorSubject<User>;
}

export { Storage };
