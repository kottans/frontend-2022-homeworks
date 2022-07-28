_Thank you for contributing to this repo!_ ❤️️

# A Tiny JS World -- OOP exercise check list

Relates to
[A Tiny JS World](https://github.com/OleksiyRudenko/a-tiny-JS-world) OOP exercise.

Let's do some self-checks to fix most common issues and to make some improvements to the code while reviewers find some time to dedicate it to your submission.

Go through the checklist below, fix code as appropriate and **mark fulfilled requirements when you genuinely believe you are done**.

Please, feel free to ask questions here or seek for help in the Students' chat.

## Check-list - definition of done

**Minimal requirements to meet:**
* [ ] Implement a base class to inherit from
* [ ] Employ default parameters
* [ ] Each species is represented with its own class
* [ ] No need to specify species at instantiation
* [ ] Classes for species that do not have hands by natural design, do not consequently have `hands` or any equivalent property and do not inherit such properties from any base classes
* [ ] All inhabitants are stored in a container (array or object)
* [ ] JS native features are intensively employed (`const`, `let`, `Array.map|join|forEach|...`, etc)
* [ ] `Object` methods like `keys`, `values`, `entries` as well as `for...in` shouldn't be used as these do not guarantee any particular order of keys/values
* [ ] Properties used to form an object presentation string must be explicitly listed/specified; Use `Array.map` and `Array.join` to build a presentation string from the list.
* [ ] A parent class shouldn't know anything about its children's props. Child classes must have good reasons to assign or refer to any parent's props. There are no such reasons in this task. Method overloading is to the rescue when building an inhabitant's presentation string.
* [ ] [OOP, SOLID and DRY](https://github.com/OleksiyRudenko/a-tiny-JS-world/blob/master/README.md#learn-on-your-own) principles are intensively employed

**Optional level up (not required to implement):**
* [ ] Friends list is a list of objects refs rather than names (strings)
* [ ] Cat-woman class is built employing composition rather than inheritance only

**Bonus:**
* [ ] `toString` magic method; when implemented `print(inhabitant)` does the job as `.toString` is called implicitly
* [ ] `this.constructor.name`; when used for output then no need to store `species` property

Helpful resources:
- [ES6 classes cheat-sheet](https://gist.github.com/OleksiyRudenko/672d39b08d9d0da4e179aca49876c58b)
- [Levelling skills up on Tiny JS World](https://github.com/OleksiyRudenko/a-tiny-JS-world#leveling-your-skills-up)

_Sincerely yours,_
_Submissions Kottachecker_ 😺
