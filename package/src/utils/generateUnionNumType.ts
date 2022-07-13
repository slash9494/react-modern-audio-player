type _GenerateUnionNum<
  Length extends number,
  Counter extends number[],
  Accumulator extends number
> = Counter["length"] extends Length
  ? Accumulator
  : _GenerateUnionNum<
      Length,
      [number, ...Counter],
      Accumulator | Counter["length"]
    >;

export type NumbersToUnionNum<Num extends number> = Num extends number
  ? Num extends 0
    ? never
    : Exclude<_GenerateUnionNum<Num, [], 0>, 0>
  : never;
