// Add states to gamee
MyGame.game.state.add('BootState', MyGame.BootState); // preload loading assets, and set window ratios
MyGame.game.state.add('PreloadState', MyGame.PreloadState); // preload MyGame and home assets and be loading screen
MyGame.game.state.add('HomeState', MyGame.HomeState); // home screen state/main menu
MyGame.game.state.add('GameState', MyGame.GameState); // add GameState this is where the main MyGame will occur

// start game from Boot state
MyGame.game.state.start('BootState'); // start game state
