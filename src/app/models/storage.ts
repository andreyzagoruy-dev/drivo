import { User } from '@models/user';
import { BehaviorSubject } from 'rxjs';

interface Storage {
    userProfile:  BehaviorSubject<User>,
}

export { Storage };