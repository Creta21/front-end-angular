import { FilmsAppPage } from './app.po';

describe('films-app App', () => {
  let page: FilmsAppPage;

  beforeEach(() => {
    page = new FilmsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
