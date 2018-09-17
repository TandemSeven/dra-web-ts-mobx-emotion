# Why customise the `JssProvider` that material-ui uses?

### Short answer:

CSS specificity control

### Long answer:

This is the best way to integrate material-ui theming hooks while using custom CSS-in-JS libraries.  The custom `JssProvider` is configured to have inject `<style/>` tags into the `html-template.ejs`
via a pre-defined comment string.  This allows for *control* of where material-ui injects it's CSS-in-JS, and we're forcing it to always be at the *top* of `<head>`.

When in-house custom CSS-in-JS `<style/>` tags are injected, they will be at the bottom of `<head>`.

This means that a custom CSS-in-JS class with the same specificity as the default material-ui ones will win.

This means you don't need stupid specificity hacks like `&&&&`, and especially no need for `!important`