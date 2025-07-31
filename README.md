# Doge My Site

WOW. MUCH EXTENSION. SO CHROME.

![Doge My Site Logo](./assets/logo.png)

Ever feel like the web is just... not doge enough? Well, now you can fix that! With the Doge My Site extension, you can add a healthy dose of "MUCH WOW" to any page on the web. This extension will:

* Replace all the images with animated Doge GIFs!
* Change the font to the one and only Comic Sans!
* Doge-ify the text to make it much more wow!

## Configuration

To get started, you'll need a Giphy API key.

1. Visit the [GIPHY Developers](https://developers.giphy.com/) page to create an application and get an API key.
2. Create a `.env` file in the root of the project.
3. Add the following line to your `.env` file, replacing `YOUR_GIPHY_KEY_HERE` with your actual key:

```text
VITE_GIPHY_KEY="YOUR_GIPHY_KEY_HERE"
```

## Development

To run the extension locally for development, follow these steps:

1. Install the dependencies:

    ```bash
    npm install
    ```

2. Run the build:

    ```bash
    npm run build
    ```

3. Open Chrome and navigate to `chrome://extensions`.
4. Enable "Developer mode".
5. Click "Load unpacked" and select the `dist` directory from this project.

Now you can make changes to the source code, run `npm run build` again, and reload the extension in Chrome to see your changes.

## Such Thanks

![Powered By Giphy](./assets/giphy.gif)
