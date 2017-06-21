import {
  animate,
  style,
  trigger,
  transition,
  state,
  query,
  animateChild, keyframes
} from '@angular/animations';

export const childAnimate =
  trigger('childAnimateTrigger', [
    transition(':enter, :leave', [
      query('@*', animateChild())
    ])
  ]);

export const fabTranslate =
  trigger('fabTranslateTrigger', [
    state('collapsed', style({
      transform: 'scale(0)'
    })),
    state('expanded', style({
      transform: 'scale(1)'
    })),
    transition('collapsed => expanded', animate('200ms ease-out')),
    transition('expanded => collapsed', animate('200ms ease-in'))
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

export const growIn =
  trigger('growInTrigger', [
    transition(':enter', [
      style({
        transform: 'scale(0)'
      }),
      animate('300ms ease-out', style({
        transform: 'scale(1)'
      }))
    ])
  ]);

export const growInOut =
  trigger('growInOutTrigger', [
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

export const favIconTransition =
  trigger('favIconTransitionTrigger', [
    state('true', style({
      color: '#FF1744'
    })),
    state('false', style({
      color: 'white'
    })),
    transition('true => false', [
      animate('300ms', keyframes([
        style({color: '*', transform: 'scale(1)'}),
        style({color: 'white', transform: 'scale(0)'}),
        style({color: '*', transform: 'scale(1)'})
      ]))
    ]),
    transition('false => true', [
      animate('300ms', keyframes([
        style({color: '*', transform: 'scale(1)'}),
        style({color: '#FF1744', transform: 'scale(0)'}),
        style({color: '*', transform: 'scale(1)'})
      ]))
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

export const slideUpTop =
  trigger('slideUpTopTrigger', [
    state('expanded', style({
      position: 'absolute',
      top: 0,
    })),
    state('collapsed', style({
      position: 'relative'
    })),
    transition('collapsed => expanded', [
      animate(200, keyframes([
        style({
          position: 'relative',
          transform: 'scale(1)',
          offset: 0
        }),
        style({
          position: 'relative',
          transform: 'scale(.8)',
          offset: .2
        }),
        style({
          position: 'absolute',
          top: 0,
          transform: 'scale(1)',
          offset: 1
        })
      ]))
    ])
  ]);
