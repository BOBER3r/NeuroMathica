/**
 * Algebra utilities for NeuroMathica.
 * Covers linear/quadratic equation solving, slope-intercept form,
 * linear interpolation, and a safe expression evaluator.
 */

/**
 * Solve the linear equation  ax + b = 0.
 * Returns `null` when a === 0 (no unique solution or no solution).
 */
export function solveLinear(a: number, b: number): number | null {
  if (a === 0) return null;
  return -b / a;
}

/**
 * Return the real roots of  ax^2 + bx + c = 0.
 * - Two distinct roots when discriminant > 0
 * - One repeated root when discriminant === 0
 * - Empty array when discriminant < 0
 * Throws when a === 0 (not a quadratic).
 */
export function solveQuadratic(
  a: number,
  b: number,
  c: number,
): number[] {
  if (a === 0) throw new Error("Coefficient 'a' cannot be zero for a quadratic");
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return [];
  if (discriminant === 0) return [-b / (2 * a)];
  const sqrtD = Math.sqrt(discriminant);
  return [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)];
}

/** Evaluate the linear function y = mx + b at a given x. */
export function evaluateLinear(m: number, b: number, x: number): number {
  return m * x + b;
}

/**
 * Derive slope-intercept form (y = mx + b) from two points.
 * Returns `null` for vertical lines.
 */
export function slopeIntercept(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): { slope: number; intercept: number } | null {
  if (x1 === x2) return null;
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;
  return { slope: m, intercept: b };
}

// ---------------------------------------------------------------------------
// Expression Evaluator — safe, no eval()
// ---------------------------------------------------------------------------

/** Token types produced by the lexer. */
type TokenType =
  | "number"
  | "variable"
  | "operator"
  | "lparen"
  | "rparen"
  | "function";

interface Token {
  type: TokenType;
  value: string;
}

const FUNCTIONS = new Set(["sin", "cos", "sqrt", "abs", "tan", "log"]);

/**
 * Tokenise a math expression string.
 * Supports numbers (incl. decimals), single-letter variables, operators
 * (+, -, *, /, ^), parentheses, and named functions.
 */
function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const src = expression.replace(/\s+/g, "");

  while (i < src.length) {
    const ch = src[i] as string;

    // Numbers (including decimals)
    if (/\d/.test(ch) || (ch === "." && i + 1 < src.length && /\d/.test(src[i + 1] as string))) {
      let num = "";
      while (i < src.length && (/\d/.test(src[i] as string) || src[i] === ".")) {
        num += src[i];
        i++;
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    // Letters -> function name or variable
    if (/[a-zA-Z]/.test(ch)) {
      let name = "";
      while (i < src.length && /[a-zA-Z]/.test(src[i] as string)) {
        name += src[i];
        i++;
      }
      if (FUNCTIONS.has(name)) {
        tokens.push({ type: "function", value: name });
      } else {
        // Each letter is a separate variable (allows multi-char like "pi" if needed
        // but for standard use each char is a var)
        tokens.push({ type: "variable", value: name });
      }
      continue;
    }

    if (ch === "(") {
      tokens.push({ type: "lparen", value: "(" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rparen", value: ")" });
      i++;
      continue;
    }

    if (["+", "-", "*", "/", "^"].includes(ch)) {
      tokens.push({ type: "operator", value: ch });
      i++;
      continue;
    }

    throw new Error(`Unexpected character '${ch}' at position ${i}`);
  }

  return tokens;
}

/**
 * Recursive-descent parser that respects standard math precedence:
 *   expression  -> term (('+' | '-') term)*
 *   term        -> exponent (('*' | '/') exponent)*
 *   exponent    -> unary ('^' exponent)?        (right-associative)
 *   unary       -> ('-' | '+') unary | primary
 *   primary     -> number | variable | function '(' expression ')' | '(' expression ')'
 */
function parseAndEvaluate(
  tokens: Token[],
  variables: Record<string, number>,
): number {
  let pos = 0;

  function peek(): Token | undefined {
    return tokens[pos];
  }

  function consume(): Token {
    const token = tokens[pos];
    if (!token) throw new Error("Unexpected end of expression");
    pos++;
    return token;
  }

  function parseExpression(): number {
    let result = parseTerm();
    while (peek()?.type === "operator" && (peek()?.value === "+" || peek()?.value === "-")) {
      const op = consume().value;
      const right = parseTerm();
      result = op === "+" ? result + right : result - right;
    }
    return result;
  }

  function parseTerm(): number {
    let result = parseExponent();
    while (peek()?.type === "operator" && (peek()?.value === "*" || peek()?.value === "/")) {
      const op = consume().value;
      const right = parseExponent();
      if (op === "/") {
        if (right === 0) throw new Error("Division by zero");
        result = result / right;
      } else {
        result = result * right;
      }
    }
    return result;
  }

  function parseExponent(): number {
    const base = parseUnary();
    if (peek()?.type === "operator" && peek()?.value === "^") {
      consume(); // '^'
      const exp = parseExponent(); // right-associative
      return Math.pow(base, exp);
    }
    return base;
  }

  function parseUnary(): number {
    if (peek()?.type === "operator" && peek()?.value === "-") {
      consume();
      return -parseUnary();
    }
    if (peek()?.type === "operator" && peek()?.value === "+") {
      consume();
      return parseUnary();
    }
    return parsePrimary();
  }

  function parsePrimary(): number {
    const token = peek();
    if (!token) throw new Error("Unexpected end of expression");

    // Number literal
    if (token.type === "number") {
      consume();
      return parseFloat(token.value);
    }

    // Variable
    if (token.type === "variable") {
      consume();
      const name = token.value;
      // Support implicit multiplication: 2x -> 2 * x handled at token level
      if (!(name in variables)) {
        throw new Error(`Undefined variable '${name}'`);
      }
      return variables[name] as number;
    }

    // Named function: sin(...), cos(...), sqrt(...), abs(...)
    if (token.type === "function") {
      const fnName = consume().value;
      if (peek()?.type !== "lparen") {
        throw new Error(`Expected '(' after function '${fnName}'`);
      }
      consume(); // '('
      const arg = parseExpression();
      if (peek()?.type !== "rparen") {
        throw new Error(`Expected ')' after function argument`);
      }
      consume(); // ')'
      switch (fnName) {
        case "sin":
          return Math.sin(arg);
        case "cos":
          return Math.cos(arg);
        case "tan":
          return Math.tan(arg);
        case "sqrt":
          return Math.sqrt(arg);
        case "abs":
          return Math.abs(arg);
        case "log":
          return Math.log(arg);
        default:
          throw new Error(`Unknown function '${fnName}'`);
      }
    }

    // Parenthesized sub-expression
    if (token.type === "lparen") {
      consume(); // '('
      const result = parseExpression();
      if (peek()?.type !== "rparen") {
        throw new Error("Expected closing parenthesis");
      }
      consume(); // ')'
      return result;
    }

    throw new Error(`Unexpected token '${token.value}'`);
  }

  const result = parseExpression();
  if (pos < tokens.length) {
    throw new Error(`Unexpected token '${(tokens[pos] as Token).value}' at position ${pos}`);
  }
  return result;
}

/**
 * Insert implicit multiplication tokens where needed:
 *   2x   -> 2 * x
 *   x(   -> x * (
 *   )(   -> ) * (
 *   )x   -> ) * x
 *   2sin -> 2 * sin
 */
function insertImplicitMultiplication(tokens: Token[]): Token[] {
  const result: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i] as Token;
    result.push(current);

    if (i + 1 < tokens.length) {
      const next = tokens[i + 1] as Token;
      const shouldInsert =
        // number followed by variable, function, or '('
        (current.type === "number" &&
          (next.type === "variable" || next.type === "function" || next.type === "lparen")) ||
        // variable followed by '(' or number
        (current.type === "variable" &&
          (next.type === "lparen" || next.type === "number" || next.type === "variable" || next.type === "function")) ||
        // ')' followed by '(', variable, number, or function
        (current.type === "rparen" &&
          (next.type === "lparen" || next.type === "variable" || next.type === "number" || next.type === "function"));

      if (shouldInsert) {
        result.push({ type: "operator", value: "*" });
      }
    }
  }
  return result;
}

/**
 * Evaluate a simple math expression string with variable substitution.
 *
 * Supported operators: `+`, `-`, `*`, `/`, `^`
 * Supported functions: `sin`, `cos`, `tan`, `sqrt`, `abs`, `log`
 * Implicit multiplication: `2x`, `3(x+1)`
 *
 * @example
 * evaluateExpression("2*x + 1", { x: 3 }) // 7
 * evaluateExpression("x^2 + 2*x + 1", { x: 4 }) // 25
 */
export function evaluateExpression(
  expression: string,
  variables: Record<string, number> = {},
): number {
  const rawTokens = tokenize(expression);
  const tokens = insertImplicitMultiplication(rawTokens);
  return parseAndEvaluate(tokens, variables);
}

/** Linear interpolation: given two points, compute y for a given x. */
export function interpolateLinear(
  x: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  if (x1 === x2) throw new Error("x1 and x2 must be different for interpolation");
  return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
}
