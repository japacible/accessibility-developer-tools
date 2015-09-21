(function(){
    module("composedParentNode");

    test("No Shadow DOM", function() {
        var fixture = document.getElementById('qunit-fixture');
        var parent = fixture.appendChild(document.createElement('div'));
        parent.id = 'parent';
        var child = parent.appendChild(document.createElement('span'));
        child.id = 'child';
        equal(axs.dom.composedParentNode(child), parent);
        var textNode = child.appendChild(document.createTextNode('Hello, world!'));
        equal(axs.dom.composedParentNode(textNode), child);
    });

    test("Shadow root parent", function () {
        var fixture = document.getElementById('qunit-fixture');
        var host = fixture.appendChild(document.createElement('div'));
        host.id = 'host';
        if (host.createShadowRoot) {
            var root = host.createShadowRoot();
            equal(axs.dom.composedParentNode(root), host);
        } else {
            console.warn("Test platform does not support shadow DOM");
            ok(true);
        }
    });

    test("Distributed content parent", function () {
        var fixture = document.getElementById('qunit-fixture');
        var host = fixture.appendChild(document.createElement('div'));
        host.id = 'host';
        var testElement = host.appendChild(document.createElement('span'));
        if (host.createShadowRoot) {
            var matched = [];
            var root = host.createShadowRoot();
            var content = document.createElement('content');
            root.appendChild(content);
            equal(axs.dom.composedParentNode(testElement), host);
        } else {
            console.warn("Test platform does not support shadow DOM");
            ok(true);
        }
    });

    test("Nodes within shadow DOM parent", function () {
        var fixture = document.getElementById('qunit-fixture');
        var host = fixture.appendChild(document.createElement("div"));
        host.id = 'host';
        if (host.createShadowRoot) {
            var root = host.createShadowRoot();
            var shadowChild = root.appendChild(document.createElement('div'));
            equal(axs.dom.composedParentNode(shadowChild), host);
        } else {
            console.warn("Test platform does not support shadow DOM");
            ok(true);
        }
    });

    test("Nodes within DOM and shadow DOM - no content distribution point", function () {
        var fixture = document.getElementById('qunit-fixture');
        var host = fixture.appendChild(document.createElement("div"));
        host.id = 'host';
        var lightChild = host.appendChild(document.createElement('span'));
        if (host.createShadowRoot) {
            var root = host.createShadowRoot();
            var shadowChild = root.appendChild(document.createElement('div'));
            shadowChild.id = 'shadowChild';
            // Child is not projected and so doesn't exist in the composed tree,
            // but we explicitly don't worry about that.
            equal(axs.dom.composedParentNode(lightChild), host);
        } else {
            console.warn("Test platform does not support shadow DOM");
            ok(true);
        }
    });

    test("Nodes within DOM and shadow DOM with content element", function () {
        var fixture = document.getElementById('qunit-fixture');
        var host = fixture.appendChild(document.createElement("div"));
        host.id = 'host';
        var lightChild = host.appendChild(document.createElement('div'));
        if (host.createShadowRoot) {
            var root = host.createShadowRoot();
            var shadowChild = document.createElement('div');
            shadowChild.id = 'shadowChild';
            root.appendChild(shadowChild);
            var content = document.createElement('content');
            root.appendChild(content);
            equal(axs.dom.composedParentNode(lightChild), host);
        } else {
            console.warn("Test platform does not support shadow DOM");
            ok(true);
        }
    });
})();
