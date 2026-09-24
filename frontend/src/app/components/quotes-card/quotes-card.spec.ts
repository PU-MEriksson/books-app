import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesCard } from './quotes-card';

describe('QuotesCard', () => {
  let component: QuotesCard;
  let fixture: ComponentFixture<QuotesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
