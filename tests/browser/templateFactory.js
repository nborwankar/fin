var assert = jsio.__env.require('assert')

jsio('import browser.templateFactory as templateFactory');

exports.testValueReplacement = function() {
	var template = '<div>{{ name }}</div><div>{{ email }}</div>';
	var replaced = templateFactory._replaceValuesWithWidgets(template);
	var shouldBe = '<div>(( _itemValueView name ))</div><div>(( _itemValueView email ))</div>';
	assert.equal(replaced, shouldBe, replaced + '\n!=\n' + shouldBe);
}

exports.testReferenceReplacement = function() {
	var template = '<div>{{ owner : user }}</div><div>{{milestone:milestone}}</div>';
	var replaced = templateFactory._replaceReferencesWithWidgets(template);
	var shouldBe = '<div>(( _itemReferenceView \'user\' owner ))</div>' +
		'<div>(( _itemReferenceView \'milestone\' milestone ))</div>';
	assert.equal(replaced, shouldBe, '\n' + replaced + '\n!=\n' + shouldBe);
}

exports.testListReplacement = function() {
	var template = '<div>[[ users ]]</div><div>[[buttons]]</div>';
	var replaced = templateFactory._replaceListsWithWidgets(template);
	var shouldBe = '<div>(( _itemListView users ))</div>' +
		'<div>(( _itemListView buttons ))</div>';
	assert.equal(replaced, shouldBe, '\n' + replaced + '\n!=\n' + shouldBe);
}