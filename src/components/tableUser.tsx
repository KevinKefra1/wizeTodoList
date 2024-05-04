import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Assignee, Task } from "../model";
import { listMenuLabel } from "../api/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { exportUsersToPDF } from "../utils";

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
    const [filteredUsers, setFilteredUsers] = useState<Assignee[]>(users);
    const [filterBy, setFilter] = useState("none");
    const [search, setSearchField] = useState("");

    const handleFilter = () => {
        let filters = [];
        if (filterBy === "name") {
            filters = users.filter((user) => {
                var name = user?.name ?? "";
                return (
                    user.name.toLowerCase().includes(search)
                );
            })
        } else if (filterBy.includes("email")) {
            filters = users.filter((user) => {

                var email = user?.email ?? "";
                return (

                    email.toLowerCase().includes(search)
                );
            })
        } else if (filterBy.includes("phone")) {
            filters = users.filter((user) => {

                var phone = user?.phone ?? "";
                return (

                    phone.toLowerCase().includes(search)
                );
            })
        } else {
            filters = users.filter((user) => {
                const { phone, email, name } = user;
                return (
                    email.toLowerCase().includes(search) ||
                    phone.toLowerCase().includes(search) ||
                    name.toLowerCase().includes(search)
                );
            });
        }
        setFilteredUsers(filters)
    }

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

    useEffect(() => {
        handleFilter();
    }, [filterBy, search, users])

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex gap-4 h-8 items-end justify-end">
                <button
                    type="button"
                    onClick={e => exportUsersToPDF(filteredUsers)}
                    className="w-36   p-3 py-1 border border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white"
                >
                    Export to PDF
                </button>

                <button
                    type="button"
                    className=" w-36  p-3 py-1 border border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white"
                >
                    Export to Excel
                </button>
            </div>
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
                            <option value={"name"}>Name </option>
                            <option value={"email"}>Email</option>
                            <option value={"phone"}>Phone</option>
                        </select>
                    </div>
                </div>
                <div></div>
            </div>
            <DataGrid
                rows={filteredUsers}
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
