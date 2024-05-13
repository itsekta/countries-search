import React, { useState } from "react";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setDisplayValue(displayValue + value);
  };

  const handleClear = () => {
    setDisplayValue("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      if (displayValue.trim() === "") {
        throw new Error("Empty expression");
      }

      const calculatedResult = calculateExpression(displayValue);
      setResult(calculatedResult);
      setDisplayValue("");
    } catch (error) {
      setResult("Error");
      setDisplayValue("");
    }
  };

  const calculateExpression = (expression) => {
    const operators = ["+", "-", "*", "/"];
    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    const parseExpression = (exp) => {
      let numStack = [];
      let opStack = [];

      const evaluateTop = () => {
        const operator = opStack.pop();
        const right = numStack.pop();
        const left = numStack.pop();

        switch (operator) {
          case "+":
            numStack.push(left + right);
            break;
          case "-":
            numStack.push(left - right);
            break;
          case "*":
            numStack.push(left * right);
            break;
          case "/":
            if (right === 0) {
              if (left === 0) {
                numStack.push(NaN);
              } else {
                numStack.push(Infinity);
              }
            } else {
              numStack.push(left / right);
            }
            break;
          default:
            throw new Error("Invalid operator");
        }
      };

      const processOperator = (op) => {
        while (
          opStack.length > 0 &&
          precedence[opStack[opStack.length - 1]] >= precedence[op]
        ) {
          evaluateTop();
        }
        opStack.push(op);
      };

      const tokens = exp.match(/\d+|\+|-|\*|\//g) || [];

      for (let token of tokens) {
        if (operators.includes(token)) {
          processOperator(token);
        } else {
          numStack.push(parseFloat(token));
        }
      }

      while (opStack.length > 0) {
        evaluateTop();
      }

      return numStack.pop();
    };

    try {
      if (expression.trim() === "") {
        return "Error";
      }

      const calculatedResult = parseExpression(expression);
      if (!isFinite(calculatedResult) || isNaN(calculatedResult)) {
        if (isNaN(calculatedResult)) {
          return "NaN";
        } else {
          return "Infinity";
        }
      }
      return calculatedResult.toString();
    } catch (error) {
      console.log("catch", error);
      return "Error";
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h1>React Calculator</h1>
        <input type="text" value={displayValue} readOnly />
        <div>{result}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("7")}
            >
              7
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("8")}
            >
              8
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("9")}
            >
              9
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("+")}
            >
              +
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("4")}
            >
              4
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("5")}
            >
              5
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("6")}
            >
              6
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("-")}
            >
              -
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("1")}
            >
              1
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("2")}
            >
              2
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("3")}
            >
              3
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("*")}
            >
              *
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={handleClear}
            >
              C
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("0")}
            >
              0
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={handleCalculate}
            >
              =
            </button>
            <button
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              onClick={() => handleButtonClick("/")}
            >
              /
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
