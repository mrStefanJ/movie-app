import { useMemo, useState } from "react";
import { User } from "../type/user";

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof User>(
  order: Order,
  orderBy: Key
): (a: User, b: User) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function useSortData(
  items: User[],
  initialOrder: Order,
  initialOrderBy: keyof User
) {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [orderBy, setOrderBy] = useState<keyof User>(initialOrderBy);

  const sortedItems = useMemo(() => {
    return [...items].sort(getComparator(order, orderBy));
  }, [items, order, orderBy]);

  return { sortedItems, order, orderBy, setOrder, setOrderBy };
}

export default useSortData;
