import { useState } from "react";
import { TableCell, TableContainer, TableHead, TableRow, Paper, Table, TableBody, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "./Modal";
import CandidateForm from "./candidateForm";
import { ADMIN_SERVICE } from "../services/admin.services";

const TableComponent = ({
  headerArray,
  dataArray,
  modalTitle,
  fetchData,
  canEdit,
  canDelete
}) => {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditModal = (data) => {
    setEditData(data);
    setOpenEditModal(!openEditModal);
  }

  const handleDeleteData = async (id) => {
    try {
      setLoading(true);
      const responseData = await ADMIN_SERVICE.deleteCandidate({ "id": id });

      if (responseData.success) {
        fetchData();
      } else {
        console.log("Unable to delete right now ", responseData);
      }
    } catch (error) {
      console.log("error in handleDeleteData of Table ", error);
    }
    setLoading(false);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              headerArray.map((data, _) => (
                <TableCell className="tableHeadItem" key={data} >{data}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((row, index) => (
            <TableRow
              key={row.name}
            >
              <TableCell align="left">
                {index + 1}
              </TableCell>
              <TableCell align="left" >
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.position || row.dob}</TableCell>
              <TableCell align="left">{row.party || row.phone}</TableCell>
              {
                row.bio &&
                <TableCell align="left">{row.bio}</TableCell>
              }
              <TableCell align="left">
                <div className="tableActionsDiv" >
                  {
                    canEdit &&
                    <IconButton disabled={loading} onClick={() => handleEditModal(row)} >
                      <EditIcon className="editIcon" />
                    </IconButton>
                  }

                  {
                    canDelete &&
                    <IconButton disabled={loading} onClick={() => handleDeleteData(row.id)} >
                      <DeleteIcon className="deleteIcon" />
                    </IconButton>
                  }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        openEditModal &&
        <ModalComponent
          open={openEditModal}
          onClose={handleEditModal}
          title={modalTitle}
          actionType="edit"
          editData={editData}
        >
          <CandidateForm />
        </ModalComponent>
      }
    </TableContainer>
  )
}

export default TableComponent;