# StackIt
A web game built on THREE.JS
![Game scene](image/scene.png)

## Background

A simple foundation, and bricks flying from two different directions.

The goal is to stack up blocks as high as possible.  Be careful! If the new brick is not landing perfectly on the top of stack, the portion excessing the border will disappear! If you totally miss the top brick, game ends.

## Mechanics:

Blocks will come from two directions, namely along X axis and Z axis, and they will be stacked up along Y axis.

The player will only need to hit "J" to decide the right time or position to drop a new block on the stack.

## credit
* Yifu Chen: build main algorithm to compute brick position and edge calculation
* Jinli Yu: build main scene, lighting and structure
* Chuan Xiong: handle brick animation
* Feng Qiao: handle camera creation and movement
* Kevin Wang: brick creation and physijs dropping effect
