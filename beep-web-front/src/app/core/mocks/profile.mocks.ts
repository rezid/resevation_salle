import { Profile } from '../models/profile/profile';

const profileList: Profile[] = [
    {
        firstName: 'zidane',
        lastName: 'abderrazak',
        dateOfBirth: new Date(),
        phoneNumber: '0602587496',
        avatar: 'void avatar',
        email: 'zidane@gmail.com',
    },
    {
        firstName: 'karima',
        lastName: 'ayacha',
        dateOfBirth: new Date(),
        phoneNumber: '0750867496',
        avatar: 'void avatar',
        email: 'ayache@gmail.com',
    },
    {
        firstName: 'John',
        lastName: 'Do',
        dateOfBirth: new Date(),
        phoneNumber: '0803254720',
        avatar: 'void avatar',
        email: 'John@gmail.com',
    },
];

export const PROFILE_LIST = profileList;

