describe('App Start', () => {
    it('should render the app component.', async () => {
        await browser.get('/');

        let appElement = element(by.tagName('app'));

        expect(await appElement.isElementPresent(by.tagName('loader-spinner')))
            .toBe(true);

        expect(await appElement.isElementPresent(by.tagName('ui-view')))
            .toBe(true);
    });
});
