A simple adventure game by Wyattaaaaaaaaaaaaaaaaa based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Menu, FirstPuzzle, SecondPuzzle, ThirdPuzzle
- **2+ scenes *not* based on `AdventureScene`**: Intro, Expos
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: setupObject(), given a circle (hidden ontop of the ispy things) and the message used at the bottom, it will make the circle interactable, invisible, add on-click effects, and show a message when it is clicked. It will also create a map value that will count if the obejct has been found yet.

    - Enhancement 2: enlarge_on_mouse(), given an object, it will add pointover and pointout effects that scale the object slightly 

Experience requirements:
- **4+ locations in the game world**: Menu, FirstPuzzle, SecondPuzzle, ThirdPuzzle, Expos
- **2+ interactive objects in most scenes**: All of the things that are clickable, 6+ in each.
- **Many objects have `pointerover` messages**: in the menu, the puzzles have pointer-over messages, in puzzles the arrow shows the message "go back?"
- **Many objects have `pointerdown` effects**: all ispy objects are clickable and have pointerdown effects
- **Some objects are themselves animated**: the spinning menu screen as well as having circles appear on items that you click

Asset sources:
- All of the puzzles are based off of "hard" jigsaw puzzles from https://www.seriouspuzzles.com/. I then cropped these pictures and removed some of the small objects from them. This was done in photoshop

- The key is an outline that I drew over (from https://maisondestencils.com/ornament/679-skeleton-key-g-stencil.html) and split into three different pictures (base, blade, and body) using photoshop.

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.