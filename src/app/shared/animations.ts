import {
  animate,
  style,
  trigger,
  transition,
  state, keyframes,
} from '@angular/animations';

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

export const buttonClickFeedback =
  trigger('buttonClickFeedbackTrigger', [
    state('true', style({transform: 'scale(1)'})),
    transition('* => true',
      animate('250ms ease-in-out', keyframes([
        style({ transform: 'scale(1)' }),
        style({ color: 'green', transform: 'scale(1.4)' }),
        style({ transform: 'scale(1)' })
      ]))
    )
  ]);
