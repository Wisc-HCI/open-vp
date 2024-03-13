import { useMemo } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import BrowserOnly from "@docusaurus/BrowserOnly";
import CodeBlock from "@theme/CodeBlock";
import Link from "@docusaurus/Link";
import { createTheme, ThemeProvider } from "@mui/material";
import { useColorMode } from "@docusaurus/theme-common";

// const rows = [
//   {
//     name: "id",
//     required: true,
//     type: "string",
//     description: "The unique identifier of the object",
//     example: '"stringValue"',
//   },
//   {
//     name: "name",
//     required: false,
//     type: {
//       type: "or",
//       entries: [
//         "number",
//         { type: "link", label: "TypeSpec", path: "/docs/tutorial/intro" },
//       ],
//     },
//     description: "The unique identifier of the object",
//     example: '"stringValue"',
//   },
// ];

export default function DocViewer({ rows = [] }) {
  const { colorMode } = useColorMode();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode === "dark" ? "dark" : "light",
        },
      }),
    [colorMode],
  );

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <ThemeProvider theme={theme}>
          <TableContainer component={Paper} componentProps={{ sx: {} }}>
            <Table
              size="small"
              sx={{ minWidth: 650, marginBottom: 0 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Required</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="left">Example</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      {getType(row.type, true)}
                    </TableCell>
                    <TableCell align="right">
                      {row.required ? "★" : ""}
                    </TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      {row.example ? (
                        <CodeBlock language="javascript">
                          {row.example}
                        </CodeBlock>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      )}
    </BrowserOnly>
  );
}

function getType(typeDescription, top) {
  if (typeof typeDescription === "string") {
    return <i>{typeDescription}</i>;
  }
  if (typeDescription.type === "or" || typeDescription.type === "and") {
    return (
      <span>
        {top ? "" : "("}
        {typeDescription.entries.map((entry, index) => {
          return (
            <span>
              {getType(entry, false)}
              {index < typeDescription.entries.length - 1
                ? ` ${typeDescription.type === "or" ? "|" : "&"} `
                : ""}
            </span>
          );
        })}
        {top ? "" : ")"}
      </span>
    );
  }
  if (typeDescription.type === "link") {
    return <Link to={typeDescription.path}>{typeDescription.label}</Link>;
  }
  if (typeDescription.type === "record") {
    return (
      <span>
        {"Record<"}
        {getType(typeDescription.key, true)},
        {getType(typeDescription.value, true)}
        {">"}
      </span>
    );
  }
  if (typeDescription.type === "object") {
    return (
      <span>
        {"{"}
        {Object.keys(typeDescription.value).map((field, index) => {
          return (
            <span>
              {field}: {getType(typeDescription.value[field], true)}
              {index < Object.keys(typeDescription.value).length - 1
                ? ", "
                : ""}
            </span>
          );
        })}
        {"}"}
      </span>
    );
  }
  if (typeDescription.type === "array") {
    return (
      <span>
        {getType(typeDescription.value, true)}
        {"[]"}
      </span>
    );
  }
}
