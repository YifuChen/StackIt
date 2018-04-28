# Stack.io
A WebGL game built on THREE.JS
[LIVE GAME LINK](https://acw101.github.io/StackIt)
![menu](/image/menu.png)

## Background

A simple foundation, and bricks flying from two different directions.

The goal is to stack up blocks as high as possible. Be careful! If the new brick is not landing perfectly on the top of stack, the portion excessing the border will disappear! If you totally miss the top brick, game ends.

## Mechanics

Blocks will come from two directions, namely along X axis and Z axis, and they will be stacked up along Y axis.

The player will only need to hit "**SPACE**" to decide the right time or position to drop a new block on the stack.

## Credit
* [Yifu Chen](https://github.com/YifuChen): build main algorithm to compute brick position and edge calculation
* [Jinli Yu](https://github.com/JinliYu): build main scene, lighting and structure
* [Chuan Xiong](https://github.com/StargazerYi): handle brick animation
* [Feng Qiao](https://github.com/icadi): handle camera creation and movement
* [Kevin Wang](https://github.com/ACW101): brick creation and physijs dropping effect

## TODO
- [x] Fix dropping brick animation: gravity, ratation
- [x] Add different palette to bricks, use gradient colors
- [x] Give error tolerance to landing bricks perfectly on the top of stack
- [x] Background decoration
- [ ] UI: tutorial, leaderboard, back button, social media sharing buttons, more animations
