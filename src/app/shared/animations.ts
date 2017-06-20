import {
  animate, style, trigger, transition, useAnimation, stagger, animation, state,
  keyframes
} from '@angular/animations';

export const fabRotate =
  trigger('fabRotateTrigger', [
    state('up', style({transform: 'rotate(180deg) scale(1.5)'})),
    state('down', style({transform: 'rotate(0) scale(1)'})),
    transition('up => down', [
      animate('300ms ease-in-out',
        style({transform: 'rotate(0deg) scale(1)'}))
    ]),
    transition('down => up', [
      animate('300ms ease-in-out',
        style({transform: 'rotate(180deg) scale(1.5)'}))
    ])
  ]);

export const fabTranslate =
  trigger('fabTranslateTrigger', [
    state('up', style({transform: 'translateY(0) scale(1.2)'})),
    state('down', style({transform: 'translateY(30px) scale(1)'})),
    transition('* => *', [
      animate('300ms ease-in-out')
    ])
  ]);

export const fadeDown =
  trigger('fadeDownTrigger', [
    transition(':leave', [
      animate('200ms ease-in', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ]),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(0)'
      }),
      animate('200ms ease-out')
    ])
  ]);


export const fadeUp =
  trigger('fadeUpTrigger', [
    transition(':leave', [
      animate('200ms ease-in', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }))
    ]),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(0)'
      }),
      animate('200ms ease-out')
    ])
  ]);

export const fabEnter =
  trigger('fabEnterTrigger', [
    transition(':enter', [
      style({
        transform: 'scale(0)'
      }),
      animate('250ms ease-in-out')
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

export const moveToTop =
  trigger('moveToTopTrigger', [
    state('normal', style({
      position: 'relative',
      top: 0,
      left: 0,
      zIndex: 6
    })),
    state('top', style({
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 6
    })),
    transition('normal => top', [
      animate('250ms ease-in-out')
    ])
  ]);
