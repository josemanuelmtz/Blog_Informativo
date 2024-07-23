import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistanoticiasComponent } from './vistanoticias.component';

describe('VistanoticiasComponent', () => {
  let component: VistanoticiasComponent;
  let fixture: ComponentFixture<VistanoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistanoticiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistanoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
