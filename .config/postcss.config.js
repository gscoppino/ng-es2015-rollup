module.exports = {
    "input": "src/main.css",
    "output": "dist/main.css",
    "map": "file",
    "local-plugins": true,
    "use": ["postcss-import", "postcss-cssnext"],
    "postcss-cssnext": {
        "browsers": [
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
    }
};