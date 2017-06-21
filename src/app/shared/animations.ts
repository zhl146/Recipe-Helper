import {
  animate,
  style,
  trigger,
  transition,
  state,
  query,
  animateChild
} from '@angular/animations';

export const childAnimate =
  trigger('childAnimateTrigger', [
    transition(':enter, :leave', [
      query('@*', animateChild())
    ])
  ]);

export const fabTranslate =
  trigger('fabTranslateTrigger', [
    state('in', style({transform: 'translateY(0) scale(1)'})),
    transition(':enter', [
      style({
        transform: 'translateY(-300%) scale(0)'
      }),
      animate('300ms ease-in-out', style({
        transform: 'translateY(0) scale(1)'
      }))
    ])
  ]);

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

export const shrinkInOut =
  trigger('shrinkInOutTrigger', [
    transition(':enter', [
      style({
        transform: 'scale(0)'
      }),
      animate('5000ms ease-in-out', style({
        transform: 'scale(1)'
      }))
    ]),
    transition(':leave', [
      style({
        transform: 'scale(1)'
      }),
      animate('5000ms ease-in-out', style({
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
      animate('200ms ease-in-out', style({
        height: 0,
        opacity: 0
      }))
    ]),
    transition(':enter', [
      style({
        height: 0,
        opacity: 0
      }),
      animate('200ms ease-in-out')
    ])
  ]);
