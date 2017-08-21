import { NgZorroDemoPage } from './app.po';

describe('ng-zorro-demo App', () => {
  let page: NgZorroDemoPage;

  beforeEach(() => {
    page = new NgZorroDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
