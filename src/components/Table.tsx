"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { ApiRequest } from "@prisma/client";
import { useTheme } from "next-themes";

type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
  timestamp: string;
};

interface TableProps {
  userRequests: ModifiedRequestType<"timestamp">[];
}

const columnsDraft: GridColDef[] = [
  {
    field: "col1",
    headerName: "API Key Used",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName} 🔑</strong>
      );
    },
  },
  { field: "col2", headerName: "Path", width: 250 },
  { field: "col3", headerName: "Recency", width: 250 },
  { field: "col4", headerName: "Duration", width: 150 },
  { field: "col5", headerName: "Status", width: 150 },
];

// wrap all column with <strong> to make them bold
const columns = columnsDraft.map((column) =>
  column.field === "col1"
    ? column
    : {
        ...column,
        renderHeader(params: GridColumnHeaderParams<any, any, any>) {
          return (
            <strong className="font-semibold">
              {params.colDef.headerName}
            </strong>
          );
        },
      }
);

export default function Table({ userRequests }: TableProps) {
  const { theme: appTheme } = useTheme();

  const theme = createTheme({
    palette: {
      mode: appTheme === "light" ? "light" : "dark",
    },
  });

  const rows = userRequests.map((request) => ({
    id: request.id,
    col1: request.usedApiKey,
    col2: request.path,
    col3: request.timestamp,
    col4: `${request.duration} ms`,
    col5: request.status,
  }));

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        style={{
          backgroundColor: appTheme === "light" ? "white" : "#152238",
          fontSize: "1rem",
        }}
        pageSizeOptions={[5]} // 5 listings per page
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  );
}
