Folder structure:
Followed suggestions from https://www.youtube.com/watch?v=UUga4-z7b6s.

App/index.js: main entry point

App:
    assets: images, audio, etc.

    components: shared components across screens, can have folders under it to categorize components.
        - forms: Form related components.
        - buttons: Button related components.
        - NavBar.js: Single component file. 

    screens: (https://youtu.be/UUga4-z7b6s?t=715)
        - home.js: 
        - login.js:
        - logout.js:
        - profile.js: user profile.
        - settings.js: 
        - purchase.js: 

    data: json files, config values, constants, etc. 

    features: smaller than screens/pages, but bigger than a component. 99% of code should be under this folder. (https://youtu.be/UUga4-z7b6s?t=753)
        - phase_builder // this feature can be put to chat screen or can be at home page.
            - assets: assets that are specific to this feature.
            - components: components that are specific to this feature.
            - services: API integration that are specific to this feature.
            - index.js:  Export only happens in this file. Other files only import from this file. (https://youtu.be/UUga4-z7b6s?t=823)

    lib: Wrapper around third party libraries with Facade pattern (https://youtu.be/UUga4-z7b6s?t=635)

    services: Integrating with APIs (https://youtu.be/UUga4-z7b6s?t=693)

    utils: small functions (generally should be pure functions) shared across the app, like logger, alerts, etc.



Naming conventions:
Components: Component names should be written in PascalCase. For example, Button, Header, or ProfileCard. Start component names with an uppercase letter.

Files: File names should match the component name they contain. Use PascalCase for both the file name and the component name. For example, Button.js, Header.js, or ProfileCard.js.

Props: Prop names should be written in camelCase. For example, backgroundColor, onPress, or textColor. Start prop names with a lowercase letter.

Styling: For style-related attributes, use camelCase as well. For example, fontSize, marginHorizontal, or borderColor.

Constants: Use uppercase with underscores for constant values. For example, API_URL, COLOR_PRIMARY, or MAX_LENGTH.

Functions and Variables: Use camelCase for function and variable names. For example, getUserData, count, or isValidEmail.

Event Handlers: Prefix event handler functions with handle followed by the event or action. For example, handlePress, handleInputChange, or handleSubmit.


Formatting:
Prettier Code Formatter extension: Prettier is a popular code formatter that, by default, formats quotes to double quotes. 
(How To Setup Prettier: https://www.youtube.com/watch?v=DqfQ4DPnRqI). 
Let's turn on "Format on save". 

Let's keep this default setting, and use double quotes across the app. Reasons for this is JSON only allows double quotes.
It's better to keep it consistentant. So let's use double quotes across the app. 

logging:
Let’s specify log level, if it’s error, let’s use logger.error(). If it’s for debug only, let’s use logger.debug().
the explanation of log levels is in utils/logger.js
Let’s gradually change the console.log() to logger(). Otherwise, when we push to production, the app would be slow 
and we may leak sensitive information by logging to console.