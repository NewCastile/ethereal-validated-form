<!-- @format -->

## A project for practice

So from my last project called [Gophy](https://github.com/NewCastile/gophy) one thing that i really liked was managing state with useReducer.
A long time ago i heard that one way to make sure you learned something is to be able to do it four times, so in this little app i made
for reducers:

- useForm for managing the values of the fields,
- useCompletion for validating that each step was completed correctly,
- useCode for storing and reseting the code for the code validation step,
- and useNotification, to provided some feedback (as every form should do).

So of course this was something that i could done using a more simple aproach (a form-state-manager library) but the thing that
i wanted to explore with this project was managing global state. Tanner linsley (creator of react-query) said: _Redux patterns are not bad, it is just the implementation and the closeness to React that it kinda felt like it was missing for a while_. The first time i tryed redux it was a complete mess, but i kinda got the idea of this
event-driven-like app you can create with it. After watching his ["Action Hook"](https://www.youtube.com/watch?v=JRz-xMIyPUA) pattern
video this idea of a multi-step form came to my mind so here it is.

## Use guide

So this project works only with ethereal but relax, i included a user to which you can send a message you by copying the info i put on the form in the corresponding fields.

## A little explanation

As you can see (if you watched the code of course) theres multiple actions comming from different contexts that worked together in a logical secuence so for example, in the second form you see a Go Back button, this button

- First invalidates the code via the `completionDispatcher` changing the completion state making us go back to the first form
- Secondly, resets the valdiation code via the `codeDispatcher` invoking the uuid method again producing a new code,
- and Lastly, resets the notification state via the `notificationDispatcher` to display nothing in the first form, as it was filled with the correct values.

So there you go, three separated and different states working with each other.

Notice this logical sequences happens in every onClick handler of the whole app, and notice that each of this context could have been merged
in one so to minimize the code.

This useReducer + useContext combo is really cool so i encourage you to give it a try.

## Things i might missed

- Responsiveness. ✅
- Creating a single context for the whole app.
- Adding a little turn-around animation for the form card to show a link to [ethereal](https://ethereal.email/).
- Adding and gif to the README.md file.
- Button to paste example user into form in one click. ✅
