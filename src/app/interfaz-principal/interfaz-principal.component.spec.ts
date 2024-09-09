import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfazPrincipalComponent } from './interfaz-principal.component';

describe('InterfazPrincipalComponent', () => {
  let component: InterfazPrincipalComponent;
  let fixture: ComponentFixture<InterfazPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfazPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfazPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
