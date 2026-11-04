# Verb Lab

A zero-dependency Japanese verb conjugation practice app inspired by the learning flow of the referenced JapaneseJLPT page.

## Run it

Open `index.html` in a modern browser. No installation or server is required.

## Verify the conjugation engine

With Node.js installed, run:

```powershell
node tests.mjs
```

The app supports 13 forms across Godan, Ichidan, する, and 来る verbs, including the key 行く and ある exceptions. It accepts answers in kana or simplified romaji.
