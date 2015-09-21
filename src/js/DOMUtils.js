// Copyright 2015 Google Inc.
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

goog.provide('axs.dom');

/**
 * Returns the nearest ancestor which is an Element.
 * @param {Node} node
 * @return {Element}
 */
axs.dom.parentElement = function(node) {
    if (!node)
        return null;
    if (node.nodeType == Node.DOCUMENT_FRAGMENT_NODE)
        return node.host;

    var parentElement = node.parentElement;
    if (parentElement)
        return parentElement;

    var parentNode = node.parentNode;
    if (!parentNode)
        return null;

    switch (parentNode.nodeType) {
    case Node.ELEMENT_NODE:
        return /** @type {Element} */ (parentNode);
    case Node.DOCUMENT_FRAGMENT_NODE:
        return parentNode.host;
    default:
        return null;
    }
};

/**
 * Returns the given Node's parent in the composed tree.
 * @param {Node} node
 * @return {Node}
 */
axs.dom.composedParentNode = function(node) {
    if (!node)
        return null;
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
        return node.host;

    var parentNode = node.parentNode;
    if (!parentNode)
        return null;

    if (parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
        return parentNode.host;
    return parentNode;
};

/**
 * Return the corresponding element for the given node.
 * @param {Node} node
 * @return {Element}
 * @suppress {checkTypes}
 */
axs.dom.asElement = function(node) {
    /** @type {Element} */ var element;
    switch (node.nodeType) {
    case Node.COMMENT_NODE:
        return null;  // Skip comments
    case Node.ELEMENT_NODE:
        element = /** (@type {Element}) */ node;
        if (element.tagName.toLowerCase() == 'script')
            return null;  // Skip script elements
        break;
    case Node.TEXT_NODE:
        element = axs.dom.parentElement(node);
        break;
    default:
        console.warn('Unhandled node type: ', node.nodeType);
        return null;
    }
    return element;
};

