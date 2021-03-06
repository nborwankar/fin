jsio('from common.javascript import Singleton, Publisher, bind');
jsio('import common.Publisher');
jsio('import common.Item');

var logger = logging.getLogger(jsio.__path);

exports = Singleton(common.Publisher, function(supr) {
	
	this.init = function(data) {
		supr(this, 'init');
		this._items = {};
	}
	
	this.loadItemSnapshot = function(snapshot, callback) {
		logger.log('Loading snapshot for item', snapshot);
		var item = this.getItem(snapshot._id);
		item.setSnapshot(snapshot);
	}
	
	this.getItem = function(id) {
		if (this._items[id]) { return this._items[id]; }
		this._items[id] = new common.Item(id);
		this._publish('ItemCreated', this._items[id]);
		return this._items[id];
	}
	
	this.hasItem = function(id) {
		return !!this._items[id];
	}
	
})
