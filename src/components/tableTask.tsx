import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Assignee, Task } from "../model";
import { listMenuLabel } from "../api/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

const columns: GridColDef[] = [
  { field: "title", headerName: "", width: 200 },
  {
    field: "assignee",
    headerName: "",
    flex: 1,
    renderCell: (params) => <AssigneeComponent params={params} />,
  },
  {
    field: "labels",
    headerName: "",
    width: 150,
    renderCell: (params) => <Labelcomponent params={params} />,
  },
  {
    field: "startDate",
    headerName: " ",
    minWidth: 250,
    valueFormatter: (date: Date) => formatDate(date),
  },
];

function formatDate(date: Date): string {
  const month = date.toLocaleDateString("en-US", { month: "long" }); // Use built-in formatting
  const day = date.getDate();
  const year = date.getFullYear();

  return `Schedule for ${month} ${day}, ${year}`;
}

const AssigneeComponent = ({ params }: any) => {
  console.log(params.row);
  const { description } = params.row;
  const assigneeName = params.row.assignee?.name;
  return (
    <div className="flex gap-4 bg-red-500 text-md text-gray-600 items-center h-full">
      <span className="w-32">{assigneeName}</span>
      <span>{description}</span>
    </div>
  );
};

const Labelcomponent = ({ params }: any) => {
  const labelM = listMenuLabel.filter((label) =>
    params.value.includes(label.name)
  );
  return (
    <div className="w-full h-full flex  flex-row items-center justify-center ">
      {labelM.map((label) => (
        <div className="w-8 h-8 text-lg text-gray-600 items-center">
          <FontAwesomeIcon
            icon={faDotCircle}
            className={`text-${label.color}-500`}
          />
        </div>
      ))}
    </div>
  );
};

export default function TableTasks(tasks: Task[], onClick: Function) {
  const handleRowClick = (event: any) => {
    onClick(event.row);
  };
  return (
    <div>
      <DataGrid
        rows={tasks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // componentsProps={{ Toolbar: CustomToolbar }}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
