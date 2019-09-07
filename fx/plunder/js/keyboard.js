/** @constructor */
voyc.fx.Keyboard = function() {
	this.keys = {};
}

voyc.fx.Keyboard.LEFT = 37;
voyc.fx.Keyboard.RIGHT = 39;
voyc.fx.Keyboard.UP = 38;
voyc.fx.Keyboard.DOWN = 40;
voyc.fx.Keyboard.ESC = 13;

voyc.fx.Keyboard.prototype.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this.keys[key] = false;
    }.bind(this));
}

voyc.fx.Keyboard.prototype._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this.keys) {
        event.preventDefault();
        this.keys[keyCode] = true;
    }
};

voyc.fx.Keyboard.prototype._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this.keys) {
        event.preventDefault();
        this.keys[keyCode] = false;
    }
};

voyc.fx.Keyboard.prototype.isDown = function (keyCode) {
    if (!keyCode in this.keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this.keys[keyCode];
};
