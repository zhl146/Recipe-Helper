import {
  animate,
  style,
  trigger,
  transition,
  state,
  query,
  animateChild, keyframes
} from '@angular/animations';

export const fadeOut =
  trigger('fadeOutTrigger', [
    transition(':leave', [
      animate('200ms ease-in', style({
        opacity: 0
      }))
    ]),
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('200ms ease-out')
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
      style({
        transform: 'scale(.2)'
      }),
      animate('200ms ease-out')
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({
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

export const testAnimation =
  trigger('testAnimationTrigger', [
    state('state1', style({
      left: '*'
    })),
    state('state2', style({
      left: '*'
    })),
    transition('* => *', [
      animate(200)
    ])
  ]);
