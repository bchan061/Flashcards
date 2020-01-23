<p align="center">
  <img src="https://www.ocf.berkeley.edu/~branchan/images/flashcards-1.png" alt="Flashcards"/>
  <br/>
  <b>Flashcards - 2018</b>
</p>

React app to display JSON flashcards. Run `npm start` to run the app.

## Tools
React was used to build the app. You can swap the data in `src/test/testData.js`.

## What's cool?
- You can undo your progress. If you skipped a card or purposely failed/passed a card, you can undo it and try it again.
- You can swap the questions with the answers, including any notes associated with them.

## What's not cool?
- There is no way to change the flashcard data. There is an Express server on the root of this project, but it does nothing as of now.

## Lessons
- It is much more easier to think in terms of encapsulation instead of inheritance, but the code looks much uglier.
- ES6 gives a lot of quality-of-life improvements to JavaScript that not present in my earlier JS projects (classes, spread operator, data structures...).
