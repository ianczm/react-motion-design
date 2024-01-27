import { pretty } from "../../lib/util/json";

export default function Pretty({ object }: Readonly<{ object: object }>) {
  return <div className="whitespace-pre-wrap">{pretty(object)}</div>;
}
