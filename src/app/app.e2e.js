describe('App Start', () => {
    it('should render the app component.', () => {
        browser.get('/');

        let appElement = element(by.tagName('app'));

        expect(appElement.isElementPresent(by.tagName('loader-spinner')))
            .toBe(true);

        expect(appElement.isElementPresent(by.tagName('ui-view')))
            .toBe(true);
    });
});
