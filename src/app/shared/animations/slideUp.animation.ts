import {animate, state, style, transition, trigger} from '@angular/animations';

// Component transition animations
export const slideUpAnimation =
  trigger('slideUp', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [style({opacity: 0, transform: 'translateY(60%)'}), animate('0.7s ease-in')
    ]),
    transition(':leave', [style({opacity: 0, transform: 'translateY(-60%)'}), animate('1s ease-out')
    ])
  ]);
