import stylelint from 'stylelint';
import reporter from 'postcss-reporter';
import cssimport from 'postcss-import';
import cssnext from 'postcss-cssnext';

export default {
    from: 'src/main.css',
    to: 'dist/main.css',
    map: { inline: false },
    plugins: [
        stylelint(),
        cssimport({
            plugins: [stylelint()]
        }),
        cssnext({
            browsers: [
                "IE 11",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Edge versions",
                "last 2 Safari versions",
                "last 2 Android versions",
                "last 2 ChromeAndroid versions",
                "last 2 iOS versions",
                "last 2 ExplorerMobile versions"
            ]
        }),
        reporter()
    ]
};
