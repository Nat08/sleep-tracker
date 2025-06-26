import './SleepHistory.css'
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, duration, Stack } from '@mui/material';
import prettyMs from 'pretty-ms';
import DeleteIcon from '@mui/icons-material/Delete';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'start_time',
      headerName: 'Start Time',
      width: 150,
      editable: false,
    },
    {
      field: 'end_time',
      headerName: 'End Time',
      width: 150,
      editable: false,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number',
      width: 110,
      editable: false,
      valueFormatter: (value) => prettyMs(value * 1000, {secondsDecimalDigits: 0})
    }
];

export default function SleepHistory () {
    
    const [rows, setRows] = React.useState([]);
    const [selectedRowIds, setSelectedRowsIds] = React.useState([]);
    
    const deleteFromSleepHistory = async (id: number) => {
        fetch(`http://127.0.0.1:8080/api/records/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
        }).then(
            async (resp) => {
                if (!resp.ok) {
                alert('Unable to connect to the backend.')
                return;
                }
            }
        )
    }

    const deleteRecords = async(ids: number[]) => {
        ids.forEach(id => {
            deleteFromSleepHistory(id)
        })
    }

    // retrieve start time if an active record exists
    React.useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/records`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
        }).then(
            async (resp) => {
                if (!resp.ok) {
                alert('Unable to connect to the backend.')
                return;
                }
                
                const contents = await resp.json()
                setRows(contents.data)
            }
        )
    }, [])

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(rowSelectionModel: any) => {console.log(rowSelectionModel.ids.size); rowSelectionModel.ids.size > 0 ? setSelectedRowsIds(Array.from(rowSelectionModel.ids)) : setSelectedRowsIds([])}}
            />

            {selectedRowIds?.length > 0 && (<Stack direction='row-reverse' alignItems='center'>
                <Button variant='contained' size='small' startIcon={<DeleteIcon />} sx={{background: "#FF0000", mt: 2}} onClick={(_) => deleteRecords(selectedRowIds)}>
                    Delete Selected Sleep Records
                </Button>
            </Stack>)}
        </>
    )
}