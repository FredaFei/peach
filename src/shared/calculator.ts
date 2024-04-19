export const operatorFactory = (name: Operator): Operation => {
  const table: OperatorTable = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
  };
  return table[name];
};
