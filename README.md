# Gluon
WebGL Game Engine in Electron

1) npm -g install
2) gluon-cli i [game name]
3) cd [game name]
4) gluon-cli b
5) gluon-cli s

run gluon-cli h for a full list of commands.

To work on the engine follow the above directions, then from the Gluon directory run:

1) npm link

change directory to your game project directroy:

2) npm link [path to Gluon directroy]

After that, newly build code Gluon code will run in the game project.

*warning* currently gluon-cli may need to be chmod to 755 each time Gluon has been built
