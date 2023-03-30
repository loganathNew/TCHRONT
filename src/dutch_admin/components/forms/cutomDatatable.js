import * as React from 'react';
import {
    DataGrid, GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,

} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import Pagination from '@mui/material/Pagination';
import { DataGridPro } from '@mui/x-data-grid-pro';


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'login_id', headerName: 'Login Id', width: 130 },
//     { field: 'password', headerName: 'Login Id', width: 130 },
// ];



// const rows = [
//     // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     // { id: 20, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}


function CustomPagination() {

    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}


export default function DataTable(props) {
    // const { data12 } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 100000,
    //     editable: true,
    // });
    // console.log(data12);
    const rows = props.rows;
    const columns = props.columns

    const getDetailPanelContent = React.useCallback(
        ({ row }) => <div>Row ID: {row.id}</div>,
        [],
    );

    const getDetailPanelHeight = React.useCallback(() => 400, []);

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                // pagination
                // getDetailPanelContent={getDetailPanelContent}
                // getDetailPanelHeight={getDetailPanelHeight}

                rowThreshold={0}
                editMode='row'
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[10, 20, 50, 100]}
                // pageSize={10}
                // checkboxSelection
                showCellRightBorder
                showColumnRightBorder
                density="compact"
                // initialState={{
                //     //pagination: { paginationModel: { pageSize: 10 } },
                // }}
                //   pageSizeOptions={[10, 20, 50, 100, 200]}
                
                components={{
                    Toolbar: CustomToolbar,
                    // Pagination: CustomPagination,
                }}

            />
        </div>
        // <Box sx={{ width: '100%', height: 400 }}>
        //     <DataGridPro
        //         columns={columns}
        //         rows={rows}
        //         rowThreshold={0}
        //         getDetailPanelHeight={getDetailPanelHeight}
        //         getDetailPanelContent={getDetailPanelContent}
        //     />
        // </Box>
    );
}