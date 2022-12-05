import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaPencilAlt, FaUserAlt, FaTrashAlt, FaRegSave } from "react-icons/fa";
import DeleteButton from './delete-button.component';

export default function BookTable(props) {
	const { data, onDelete } = props;

	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState("");


	const onClickEdit = (row) => {
		console.log(row)
	}
	const onClickDelete = (ret, row) => {
		if (!ret) {
			return;
		}
		onDelete(row._id)
	}
  	return (
  		<>
	    	<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Author</TableCell>
							<TableCell align="center">Published At</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{
						data.length > 0 ?
						(data.map((row, index) => (
						    <TableRow
						      key={"book-" + index}
						      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						    >
						    	<TableCell style={{width: '100px'}} component="th" scope="row">{row.title}</TableCell>
							    <TableCell style={{'max-width': '400px', overflow: 'hidden'}}>{row.description}</TableCell>
							    <TableCell style={{'max-width': '100px', overflow: 'hidden'}}>{row.authorName}</TableCell>
							    <TableCell align="center">{row.published_at.replace("T", " ").replace("Z", "").replace(/\.[0-9]+/, "")}</TableCell>
							    <TableCell align="right">
							    	<div className="row">
							    		<div className="md-col-6">
									    	<FaPencilAlt className="cursor-pointer" onClick={() => onClickEdit(row)} />
							    		</div>
							    		<div className="md-col-6">
									    	<DeleteButton className="cursor-pointer" onDelete={(ret) => onClickDelete(ret, row)} />
							    		</div>
							    	</div>
							    </TableCell>
						    </TableRow>
						))):
						<TableRow 
						    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
					    	<TableCell className="text-center" colSpan="5">No data</TableCell>
						</TableRow>
					}
					</TableBody>
				</Table>
		    </TableContainer>
		</>
  );
}
