import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Assignee, Task } from "../model";
import { listMenuLabel } from "../api/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    {
        field: "email",
        headerName: "",
        flex: 1,
        // renderCell: (params) => <AssigneeComponent params={params} />,
    },
    {
        field: "phone",
        headerName: "",
        width: 150,
        // renderCell: (params) => <Labelcomponent params={params} />,
    },

];



export default function TableAssignee(users: Assignee[], onClick: Function) {
    const [filteredTasks, setFilteredUsers] = useState<Assignee[]>(users);
    const [filterBy, setFilter] = useState("none");
    const [search, setSearchField] = useState("");

    // const handleFilter = () => {
    //     let filters = [];
    //     if (filterBy === "label") {
    //         filters = tasks.filter((task) => {
    //             return (
    //                 task.labels.some((label) => label.toLowerCase().includes(search))
    //             );
    //         })
    //     } else if (filterBy.includes("assigne")) {
    //         filters = tasks.filter((task) => {
    //             var name = task.assignee?.name ?? "";
    //             var email = task.assignee?.email ?? "";
    //             return (
    //                 name.toLowerCase().includes(search) ||
    //                 email.toLowerCase().includes(search)
    //             );
    //         })
    //     } else {
    //         filters = tasks.filter((task) => {
    //             return (
    //                 task.title.toLowerCase().includes(search) ||
    //                 task.description.toLowerCase().includes(search) ||
    //                 task.labels.some((label) => label.toLowerCase().includes(search))
    //             );
    //         });
    //     }
    //     setFilteredTasks(filters)
    // }

    const handleSearch = (event: any) => {
        const searchTerm = event.target.value.toLowerCase();

        setSearchField(searchTerm);
    };


    const handleFilterByChange = (e: string) => {
        setFilter(e);
    };


    const handleRowClick = (event: any) => {
        onClick(event.row);
    };

    // useEffect(() => {
    //     handleFilter();
    // }, [filterBy, search])

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="w-full h-16 py-2  px-8 flex flex-row">

                <div className="flex flex-row">
                    <div className="flex bg-blue-50 pl-4 w-64 items-center space-x-4 h-full rounded-full">

                        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4 opacity-30"></FontAwesomeIcon>
                        <input type={"search"} name="search" placeholder='Search here' className={`bg-transparent h-full px-4 w-full border-none focus:outline-none`} required
                            onChange={handleSearch} />
                    </div>


                    <div className="h-full  flex justify-center items-center mx-4 pr-4 rounded-xl">
                        <select
                            className="p-4 bg-transparent text-gray-900 text-md border-0  block w-full  border-none rounded-md px-3 py-2 focus:outline-none "
                            value={filterBy}
                            onChange={e => handleFilterByChange(e.target.value)}
                        >
                            <option value={"none"}>None</option>
                            <option value={"assigne"}>Assignee </option>
                            <option value={"label"}>Label</option>
                        </select>
                    </div>
                </div>
                <div></div>
            </div>
            <DataGrid
                rows={users}
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
