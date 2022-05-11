const assert = require("assert");

function addOperator(leftNode, rightNode) {
  return {
    result: () => leftNode.result() + rightNode.result(),
    toString: () => `(${leftNode.toString()} + ${rightNode.toString()})`
  }
}

function subOperator(leftNode, rightNode) {
  return {
    result: () => leftNode.result() - rightNode.result(),
    toString: () => `(${leftNode.toString()} - ${rightNode.toString()})`
  }
}

function mulOperator(leftNode, rightNode) {
  return {
    result: () => leftNode.result() * rightNode.result(),
    toString: () => `(${leftNode.toString()} x ${rightNode.toString()})`
  }
}

function divOperator(leftNode, rightNode) {
  return {
    result: () => leftNode.result() / rightNode.result(),
    toString: () => `(${leftNode.toString()} ÷ ${rightNode.toString()})`
  }
}

const OperatorMap = {
  "+": addOperator,
  "-": subOperator,
  "X": mulOperator,
  "÷": divOperator,
}

const Node = (operator, value, left, right) => {
  const result = function () {
    switch (this.operator) {
      case "+":
        return left.result() + right.result();
      case "-":
        return left.result() - right.result();
      case "x":
        return left.result() * right.result();
      case "÷":
        return left.result() / right.result();
      default:
        return value;
    }
  };

  const toString = function () {
    switch (this.operator) {
      case "+":
        return `(${left.toString()} + ${right.toString()})`;
      case "-":
        return `(${left.toString()} - ${right.toString()})`;
      case "x":
        return `(${left.toString()} x ${right.toString()})`;
      case "÷":
        return `(${left.toString()} ÷ ${right.toString()})`;
      default:
        return value.toString();
    }
  };

  return {
    operator,
    value,
    left,
    right,
    result,
    toString
  };
};

function test1() {
  const tree = Node(
    "÷",
    null,
    Node(
      "+",
      null,
      Node("", 7, null, null),
      Node(
        "x",
        null,
        Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
        Node("", 5, null, null)
      )
    ),
    Node("", 6, null, null)
  );

  assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
  assert.strictEqual(2, tree.result());
}

function testNoOperator() {
  const tree = Node(
    "",
    7,
  );

  assert.strictEqual("7", tree.toString());
  assert.strictEqual(7, tree.result());
}

function testSingleOperator() {
  const tree = Node(
    "x",
    null,
    Node("", 7, null, null),
    Node("", 6, null, null),
  );

  assert.strictEqual("(7 x 6)", tree.toString());
  assert.strictEqual(42, tree.result());
}

test1();
testSingleOperator();
testNoOperator();