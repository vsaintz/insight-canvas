import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    flexRender
} from '@tanstack/react-table'

import cvjsonfile from '@/data/csvjson.json'

const columnHelper = createColumnHelper()

const DataPreviewTable = () => {
    if (!cvjsonfile || cvjsonfile.length === 0) {
        return <div>No data available</div>
    }

    const columns = Object.keys(cvjsonfile[0]).map((key) =>
        columnHelper.accessor(key, {
            header: key,
            cell: info => {
                const value = info.getValue()
                return typeof value === 'number' ? value.toLocaleString() : value
            }
        })
    )

    const table = useReactTable({
        data: cvjsonfile,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <TableHead key={header.id}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DataPreviewTable
