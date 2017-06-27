import {
  animate,
  style,
  trigger,
  transition,
  state,
} from '@angular/animations';

export const fadeInOut =
  trigger('fadeInOutTrigger', [
    transition(':leave', [
      animate('200ms ease-in', style({
        opacity: 0
      }))
    ]),
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('200ms ease-out', style({
        opacity: 1
      }))
    ])
  ]);

export const slideInBottom =
  trigger('slideInBottomTrigger', [
    transition('void => *', [
      style({
        transform: 'translateY(-100%)',
        opacity: 0
      }),
      animate('2000ms ease-out', style({
        transform: 'translateY(0)',
        opacity: 1
      }))
    ])
  ]);

export const growInOut =
  trigger('growInOutTrigger', [
    state('big', style({
      transform: 'scale(1)'
    })),
    state('small', style({
      transform: 'scale(0)'
    })),
    transition('big => small', animate('200ms ease-in')),
    transition('small => big', animate('200ms ease-out')),
    transition(':enter', [
      style({transform: 'scale(0)'}),
      animate('180ms 150ms ease-out', style({
        transform: 'scale(1)'
      }))
    ]),
    transition(':leave', [
      style({transform: 'scale(1)'}),
      animate('180ms 150ms ease-in', style({
        transform: 'scale(0)'
      }))
    ])
  ]);

export const slideCollapseUpOut =
  trigger('slideCollapseTrigger', [
    state('collapsed', style({
      height: 0,
      opacity: 0
    })),
    state('expanded', style({
      height: '*',
      opacity: 1
    })),
    transition('expanded => collapsed', [
      animate('200ms ease-in', style({
        height: 0,
        opacity: 0
      }))
    ]),
    transition('collapsed => expanded', [
      style({
        height: 0,
        opacity: 0
      }),
      animate('200ms ease-out')
    ]),
    transition(':enter', [
      style({
        height: 0,
        opacity: 0
      }),
      animate('200ms ease-in-out')
    ])
  ]);
