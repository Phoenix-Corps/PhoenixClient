"use client";

import CustomTable, {
  ColumnConfig
} from "@/components-new-design/reusable-components/CustomTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
  { id: 4, name: "Diana", email: "diana@example.com", age: 28 },
  { id: 5, name: "Eve", email: "eve@example.com", age: 22 },
  { id: 6, name: "Frank", email: "frank@example.com", age: 27 },
  { id: 7, name: "Grace", email: "grace@example.com", age: 29 },
  { id: 8, name: "Hank", email: "hank@example.com", age: 33 },
  { id: 9, name: "Ivy", email: "ivy@example.com", age: 24 },
  { id: 10, name: "Jack", email: "jack@example.com", age: 31 },
  { id: 11, name: "Karen", email: "karen@example.com", age: 26 },
  { id: 12, name: "Leo", email: "leo@example.com", age: 34 },
  { id: 13, name: "Mona", email: "mona@example.com", age: 21 },
  { id: 14, name: "Nina", email: "nina@example.com", age: 32 },
  { id: 15, name: "Oscar", email: "oscar@example.com", age: 23 },
  { id: 16, name: "Pam", email: "pam@example.com", age: 36 },
  { id: 17, name: "Quinn", email: "quinn@example.com", age: 20 },
  { id: 18, name: "Ruth", email: "ruth@example.com", age: 37 },
  { id: 19, name: "Steve", email: "steve@example.com", age: 38 },
  { id: 20, name: "Tina", email: "tina@example.com", age: 39 }
];

const columns: ColumnConfig<User>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "age", label: "Age", render: (value: number) => `${value} years` }
];

const Page = () => {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Users</h1>
      <CustomTable data={users} columns={columns} itemsPerPage={3} />
    </div>
  );
};

export default Page;
