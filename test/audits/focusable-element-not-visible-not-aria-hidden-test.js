// Copyright 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module('FocusableElementNotVisibleAndNotAriaHidden', {
  setup: function() {
    var fixture = document.createElement('div');
    document.getElementById('qunit-fixture').appendChild(fixture);

    this.fixture_ = fixture;
    document.getElementById('qunit-fixture').style.top = 0;
    document.getElementById('qunit-fixture').style.left = 0;
  },
  teardown: function() {
    document.getElementById('qunit-fixture').style.removeProperty('top');
    document.getElementById('qunit-fixture').style.removeProperty('left');
  }
});

test('a focusable element that is visible passes the audit', function() {
  var input = document.createElement('input');

  this.fixture_.appendChild(input);
  var rule = axs.AuditRules.getRule('focusableElementNotVisibleAndNotAriaHidden');
  deepEqual(
    rule.run({scope: this.fixture_}),
    { elements: [], result: axs.constants.AuditResult.PASS }
  );
});

test('a focusable element that is hidden fails the audit', function() {
  var input = document.createElement('input');
  input.style.opacity = '0';

  this.fixture_.appendChild(input);

  var rule = axs.AuditRules.getRule('focusableElementNotVisibleAndNotAriaHidden');
  deepEqual(
    rule.run({scope: this.fixture_}),
    { elements: [input], result: axs.constants.AuditResult.FAIL }
  );
});

test('an element with negative tabindex and empty computed text is ignored', function() {
  var emptyDiv = document.createElement('div');
  emptyDiv.tabIndex = '-1';
  this.fixture_.appendChild(emptyDiv);

  var rule = axs.AuditRules.getRule('focusableElementNotVisibleAndNotAriaHidden');
  deepEqual(
    rule.run({scope: this.fixture_}),
    { result: axs.constants.AuditResult.NA });
});


test('an element in the shadow dom that is not visible passes the audit', function() {
  var fixture = document.getElementById('qunit-fixture');

  if (fixture.createShadowRoot) {
    var root = fixture.createShadowRoot();
    var input = document.createElement('input');
    root.appendChild(input);

    var rule = axs.AuditRules.getRule('focusableElementNotVisibleAndNotAriaHidden');
    deepEqual(
      rule.run({scope: fixture}),
      { elements: [], result: axs.constants.AuditResult.PASS });
  } else {
    console.warn("Test platform does not support shadow DOM");
    ok(true);
  }
});
