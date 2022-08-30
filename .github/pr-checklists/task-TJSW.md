## A Tiny JS World -- (pre-OOP) exercise check list

_Relates to [Object-Oriented JavaScript](https://github.com/kottans/frontend/blob/master/tasks/js-pre-oop.md) task._

## Check-list - definition of done

- [ ] Code is [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), which means that whenever you see a pattern in your code those should be eliminated as much as possible. Examples:
    - `print(dog); print(cat); etc ... ` should be refactored employing `Array.forEach` as the least
    - `` `${obj.legs}; ${obj.name}; etc...` `` (yes, strings are also code) must be refactored employing appropriate `Array` methods
- [ ] `Object` methods like `keys`, `values`, `entries` shouldn't be used when a particular order is required as these do not guarantee any particular order of keys/values. Same refers to `for...of` and `for...in` when applied to objects.
  Hint: List explicitly the properties used to form an object presentation string.
- [ ] Men and women belong to the same biological species. 
- [ ] ES6 `class` or `prototype`-based OO syntax aren't used.
