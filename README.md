# Release date
The Release of this project will be on July 23th, 2021

# User Interface Design
For this project, there will be 4 different designs or layouts.

## Why are there 4 different designs?
- The quantity of different devices is huge
- The responsive design doesn't apply when working with complex designs such as pacman arcade game
- In order to give a high-quality experience, the 4 different designs are necessary.

## Sizes and specifications of the designs
### 320 Design
The first design was for the smallest size of mobile phones, the ones with 320px viewport-width.
The specifications of this design are the following:
- 12 colums of 24px each
- 20 rows of 24px each
- A border of 4px 
- In summary, 296px (width) x 488px (height)

![First view](./design/images/firstView-320.png)
![Start Game View](./design/images/startGameView-320.png)
![Main Level](./design/images/mainViewLevel1-320.png)
![Complete view](./design/images/completeViewLevel1-320.png)

### 375 Design
This design was created for the mobile devices with a viewport-width of 375px.
The specifications are the following:
- 14 columns of 24px each
- 23 rows of 24px each
- A border of 4px
- In summary, the game board is 344px (width) x 560px (height)

The design is similar to the one above

### Higher design
The higher design was created for the sake of huge mobile devices such as the iPhones with a height of 812px
Specifications:
- 14 columns of 24px each
- 29 rows of 24px each
- A border of 4px
- In summary, the game board is 344px (width) x 704px (height)

The design changes a little bit, but virtually it is pretty similar

### Tablet design
There is no tablet design yet. 80% of the internet traffic is by mobile devices. So, the project is focus on mobiles devices.

### Desktop design
The desktop design is my favorite one. It is pretty huge and comfortable.
Specifications:
- 30 columns of 40px each
- 20 rows of 40px each
- A border of 5px
- In summary, the game board is 1210px (width) x 810px (height)

![First View](./design/images/firstView-Desktop.png)
![Start Game view](./design/images/startGameView-Desktop.png)
![Main View](./design/images/mainViewLevel1-Desktop.png)
![complete View](./design/images/completeViewLevel1-Desktop.png)

# Technologies used
The game is a Single Page Application and the technologies used for this project are:
- Vanilla JavaScript
- CSS
- Html
- Webpack
- NPM
- Git & GitHub

# Files organization
The "design" folder contains all Figma design images. The "dist" folder is the one sent to production (that's the one webpack generates) and the "public" folder is unnecessary, but it is according to the "good practices".

Following the "good practices", there is a src directory where all the magic happens. Within it, we can find a lot of folders that I am going to explain:
- assets: All the images and gifs used in the game, as well as sounds
- pages: All the pages with the .js extension for the SPA
- routes: The router to move along the webpage
- styles: Styles
- Utils: Stuff necessary to getHash, goFullscreen or create the grid for the game

Finally, the index.js file in the src carpet is the one webpack takes to send to production

# How it works?
To understand how the program works, we need to know it is a Single Page Application where according to the size of the screen, it is displayed a different layout of the game.

All the logic if the game actually starts at the `src/routes/index.js` file. The file calls all the necessary pages of the program and stablish the layout (according to the size of the screen).
Afterwards, we have the `src/javascript/logic.js` file where it is imported the Pacman class in `src/javascript/Pacman.js`. The Pacman class has actually everything needed for the pacman. From the controls for keyboard and touchScreen until the movement methods.

In summary, the logic.js file imports the Pacman & Ghost classes, that have all the magic.

# Understanding the Pacman class
The constructor creates the Pacman container (where the gif of the pacman will be) and a `currentDir` property, which is the "by default" direction towards the pacman will move, which in this case is Left. The actual `currentDir` property is ArrowLeft because the keyboard Events use that syntaxis.

It is important to keep in mind that the first method in the Pacman class (`setPacman()`) is called by the Logic.js file. From this call, we get the boardGame to set the pacman in the correct place (according to the game layout).

The setPacman() method calls all the controls to play the game and the movement with the default direction of the pacman. In these two controls is where the pacman can move all around.

## Pacman movement
The pacman moving can be seen as confusing at the first glance because there are some methods related to the movement. This was made this way to make reusable code. All the methods related to the 'movement' are the following:
- movementResolve
- realMovement
- movementEffect
- movementExpected
- cellExpected
- changeInCell

### movementResolve
This is the controller, all the other functions are made for `movementResolve` to have only two lines of code. As you can see, the complexity is in the other functions.

### realMovement
`realMovement`, are you serious? Well, I am not the best with names, that's a fact (open to feedback). But anyways, I am going to explain what this function does.
`realMovement` just will trigger the function movementEffect(), but in the midtime, realMovement will tell to us the direction towards the pacman will actually move. In other words, `realMovement` will handle if there are or not walls towards we want to move to. But now, how it knows if there are walls or not?

#### Feeling the walls
The pacman knows if there are 'walls' because in the `src/javascript/` directory, there are the "coordinates" of the walls (according to the layout of the game), the files have their respective layout names.

At the moment of the grid to be created, in the `src/utils/grid.js` file, all the cells that match with "coordinates" will have a dataset.value = 1.

With this dataset.value, the pacman knows where are walls, and where not. Now, every time the pacman moves, there is the function `cellExpected` that will tell us if there is available or not the place where the user wants to move. If (dataset.value === undefined){ available } else if(dataset.value === 1){ no available }

### movementEffect
This function only moves the pacman 2px in an iteration until reach the "this.distance" property value. This gives the effect of the pacman moving one cell at a time. I tried to use animations but it was all messed up, so I used an iteration instead. It is not the best strategy when talking about performace, but I didn't find a better way. I am open to feedback, by the way.

### movementExpected
Actually, this function used to do what `cellExpected` function does, but I had to change it because of the `this.newDir` property.

When our pacman is in movement and there is a new input (either in the keyboard or touchscreen), the `this.newDir` property is created. the movementExpected handles this change.

### cellExpected
This function is pretty straight forward, right? It tells us if the cell the user wants to move is available or not.

### changeInCell
Makes all the final stuff, such as 
```
this.pacmanContainer.removeChild(this.currentPacman)
this.pacmanContainer = this.boardGame.childNodes[this.row].childNodes[this.column]
this.pacmanContainer.appendChild(this.currentPacman)
```

As well as other things.

# Understanding the Ghost class
The ghost class is slightly challenging because it doesn't depend on any user input. Actually, in order to make the __Ghost__ class 'smart', the first thing needed is to know the target coordinates, or in other words, the row and the cell positions of the __pacman__ object.

## Getting the pacman coordinates
The main important thing to know about the __Ghost__ class is that it is initialized in the `src/javascript/logic` file. This file just imports the real Ghost class, which is in the `src/javascript/Ghost` file. At the moment the ghosts are created, they receive some parameters, such as:
- Color of the ghost
- Target (there is only one target; the pacman)
- Others related to the boardGame

The interesting parameter is the "target", because thanks to it, we can access to all the properties of the __pacman__ object. Some of the most important are:
- pacman.row
- pacman.column
- pacman.transformAxis
- pacman.transformSign

In order to "predict" the movement of the pacman, the __Ghost__ has to keep in mind the `target.transformAxis` and the `target.transformSign`. With these two properties, the Ghost tries to get ahead of the objective. This "prediction" is solved in the `getTarget()` and `resolveTargetCoordinates()` functions in the Ghost class.

> The target.transformAxis and target.transformSign are produced every time the Pacman moves. You can see how this happens in the `src/javascript/Pacman.js/realMovement()`

## "Smartly" movements of the ghost
Ok, once we get the coordinates of the __pacman__ object, it is easier to drive the ghost all around, right? 
Well, no exactly, because we need to keep in mind the "walls" and the real borders of the boardGame. As well as the directions of the Ghost & pacman.

Anyways, all those problems were overcome. I will describe the __key__ functions for the movement of the Ghost and if you want to go deeper, you can study the whole file in `src/javascript/Ghost`. Although, knowing the __key__ functions, everything else is a piece of cake.

### Key functions to move the ghost smartly
I splitted the most important function into 4 categories
- Functions that are always important
- Functions for movement in general
- Functions for the smart movements
- Functions for the escape loop

### Functions that are always important
The unique function that it is always important is **cellExpected()**. It tells us if the expected cell towards the Ghost wants to move is free of walls or any other obstacle.

### Functions for movement in general
We have two important functions for the movement in general:
**movementResolve()**. This functions is in charge of the movement in general. It tells us the direction where the ghost should move and if the ghost killed the pacman or not.

**availability()**.  This function tells us if the ghost entered to an "escape loop", or if we have to move the ghost again or if the ghost will move randomly (this only applies when the jail is closed).

### Functions for the escape loop
The __escape loop__ happens when the Ghost doesn't have any "smart" option available. In other words, the ghost knows where he has to go. For example, the directions of the ghost can be: "left and down" or "right and up", even "center and down" or "left and center". If the directions are "center and center", the ghost won

When the ghost tries these two coordinates/directions without success, is when the __escape loop__ comes into the game. The key functions for this loop are:
**getNewDirs()**. It returns a direction opposite of the 'smart direction'. For example, if the smart directions were "right and down", now the newDirs will be "left and up". In the case some of the directions became "center", getNewDirs() will return an random direction, either for the x or y axis. For example, if the x axis direction is "center", the function will return "left" or "right"

**setEscapeLoop()**. This function will return us a direction where we can start the loop. For example, if the ghost got trapped and cannot access to the smart movements (let's say: left and down), setEscapeLoop() will return us "right or up". It is important that this function will return only 1 direction.

**escapeLoopMovement()**. This function will trigger all the necessary actions to make the Ghost move.

**escapeLoop()**. This function is where all the magic actually happens. This function will test if there is wall or other obstacle. The first time it realizes there is any obstacle, it will trigger the movement of the Ghost.

### Functions for the smart movements
To make the Ghost smart is no so easy, there are 4 key functions that make this possible. Although without all the other functions, there would no be possinle at all. These are:
**getCoordinate()**. This function will return us the x and y coordinate of the target. Although these coordinates will be a kind of "prediction". That's why this function uses target.transformAxis and target.transformSign

**getTarget()**. This is kind a "Control tower", where it will get the coordinates and will call to other function to resolve the specific cell.

**resolveTargetCoordinates()**. In this function the Ghost acquaries two properties, the `this.targetX` and `this.targetY`. Knowing that, the Ghost knows the directions in the x and y axis

**resolveSmartMovement()**. This function will tell us the smart direction or give return an random direction (this only applies when the ghost is in the jail)