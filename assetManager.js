var assetManager = null;

function getAssetManager() {
  if (assetManager === null) {
    assetManager = new AssetManager();
  }
  return assetManager;
}

function AssetManager() {
  this.assets = {};

  this.getSprites = function(entityName, nbSprites) {
    if (this.assets[entityName] == null) {
      // The asset isn't loaded yet
      var dirname = "ressources/sprites/" + entityName.replace(/\./gi, "/");
      this.assets[entityName] = [];
      console.log("Loading - " + dirname + "/*.png");
      for (var index = 0; index < nbSprites; index++) {
        this.assets[entityName].push(loadImage(dirname + "/" + index + ".png"));
      }
    }
    return this.assets[entityName];
  };

  this.getSound = function(soundName) {
    if (this.assets[soundName] == null) {
      // The asset isn't loaded yet
      var filename =
        "ressources/sound/" + soundName.replace(/\./gi, "/") + ".mp3";
      console.log("Loading - " + filename);
      this.assets[soundName] = loadSound(filename);
    }
    return this.assets[soundName];
  };
}
