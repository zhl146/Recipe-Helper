import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNavComponent } from './recipe-nav.component';

describe('RecipeNavComponent', () => {
  let component: RecipeNavComponent;
  let fixture: ComponentFixture<RecipeNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
