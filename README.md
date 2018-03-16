# Seeya

Seeya is a framework that allows you to build and play custom 'Choose Your Own Adventure' Games! Take a look at these brief instructions to learn how to use it.

## Generator

The Generator is where you'll be able to create your Games.

* You can create Scenes that Link to each other, which are then exported into your very own Game.
* Each Scene can Link to any number of other Scenes, but it cannot Link to itself, and cannot Link to the same Scene more than once.
* Each Scene can contain one or more Flags. When the Scene is visited in the Runner, all Flags in the Scene are set.
* Each Link can be associated with one or more Flags. A Link that is associated with any Flags will only be visible on its containing scene if all of its associated Flags are set.
* When you're done with your Game, or if you'd like to save your progress and return later, you can export your Game.
* To load an existing Game and continue creating it, simply use the Import Existing Game dialog.

## Runner

Once you have created your Game, or have an export of someone else's Game, you can take it to the Runner.

* To import an existing Game, simply use the Import Game dialog.
* Once a Game has been imported, it will begin immediately.
* For each Scene, you will see the description of the Scene, and the Links to other Scenes that make up your choices.
* If a Link has any Flags attached to it, it will only be visible if all of those Flags are set. A Flag is set when the Scene that that Flag is attached to is visited. Flags are not visible to the user in the Runner, and are only used to show and hide Links based on having visited previous Scenes.
* When you make it to a Scene that does not Link to any other Scene, you've reached an ending of the Game! You'll be able to play the Game again, or import a new Game.

# Developing and Contributing

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Contributing

If you find a bug, have a suggestion, or have any other feedback about Seeya, please create an issue! Or, if you're feeling especially proactive, you can make the change yourself and submit a pull request! We want Seeya to be the most fun possible for those looking for a nostalgic 'Choose Your Own Adventure' experience, so please contribute however you like!
