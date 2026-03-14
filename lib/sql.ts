import { format } from "sql-formatter";

export type SqlDialect = "sql" | "mysql" | "postgresql" | "tsql" | "sqlite";

export const dialectLabels: Record<SqlDialect, string> = {
  sql: "Standard SQL",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  tsql: "SQL Server",
  sqlite: "SQLite",
};

export function formatSql(
  input: string,
  dialect: SqlDialect = "sql",
  indent: number = 2,
  uppercase: boolean = true
): string {
  if (!input.trim()) throw new Error("Input is empty.");
  return format(input, {
    language: dialect,
    tabWidth: indent,
    keywordCase: uppercase ? "upper" : "preserve",
  });
}
