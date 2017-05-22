import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistItemComponent } from './shoppinglist-item.component';

describe('ShoppinglistItemComponent', () => {
  let component: ShoppinglistItemComponent;
  let fixture: ComponentFixture<ShoppinglistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
