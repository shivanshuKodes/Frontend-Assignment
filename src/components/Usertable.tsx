import Table from "react-bootstrap/Table";
import TablePagination from "./TablePagination";
import { useState, useEffect, useRef } from "react";
import EditModal from "./EditModal";
import axios from "axios";
import type { User } from "../types";

interface UsertableProps {
  searchTerm: string;
}

function Usertable({ searchTerm }: UsertableProps) {
  const PAGE_SIZE = 10;
  const API_URL = "https://excelerate-profile-dev.s3.ap-south-1.amazonaws.com/1681980949109_users.json"
  const tableHeadings = ["Name", "Email", "Role", "Actions"];
  const [show, setShow] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]); // full dataset
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currUsers, setCurrUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editUserData, setEditUserData] = useState<User | null>(null);
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const selectAllRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    axios.get<User[]>(API_URL)
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Filter users whenever users or searchTerm changes (no page reset)
  useEffect(() => {
    const term = searchTerm ? searchTerm.toLowerCase() : "";
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Reset to first page ONLY when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  //  if current page exceeds total pages after deletion
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // derive current page whenever filteredUsers or currentPage change
  useEffect(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    setCurrUsers(filteredUsers.slice(start, start + PAGE_SIZE));
  }, [filteredUsers, currentPage]);

  // keep selectAll checkbox indeterminate when some (but not all) rows on page are selected
  useEffect(() => {
    if (!selectAllRef.current) return;
    const pageIds = currUsers.map(u => u.id);
    const selectedOnPageCount = pageIds.filter(id => selectedIds.has(id)).length;
    if (selectedOnPageCount === 0) { // no row selected
      selectAllRef.current.checked = false;
      selectAllRef.current.indeterminate = false;
    } else if (selectedOnPageCount === pageIds.length && pageIds.length > 0) { // all rows selected
      selectAllRef.current.checked = true;
      selectAllRef.current.indeterminate = false;
    } else { // some rows selected
      selectAllRef.current.checked = false;
      selectAllRef.current.indeterminate = selectedOnPageCount > 0;
    }
  }, [currUsers, selectedIds]);

  // Toggle single row selection (by id)
  const toggleRow = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };


  // select/deselect all rows on current page only
  const toggleSelectAllOnPage = () => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      const pageIds = currUsers.map(u => u.id);
      const allSelected = pageIds.every(id => next.has(id));
      if (allSelected) {
        // deselect page ids
        pageIds.forEach(id => next.delete(id));
      } else {
        // select page ids
        pageIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  // Delete a single user by id
  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(userId);
      return next;
    });
  };

  // Delete multiple users by their ids
  const handleDeleteMultiple = (userIds: Set<string>) => {
    if (userIds.size === 0) return;
    setUsers(prev => prev.filter(u => !userIds.has(u.id)));
    setSelectedIds(prev => {
      const next = new Set(prev);
      userIds.forEach(id => next.delete(id));
      return next;
    });
  };

  // Delete all selected rows
  const deleteSelected = () => {
    handleDeleteMultiple(selectedIds);
  };

  // helper to check if specific id is selected
  const isSelected = (id: string) => selectedIds.has(id);

  const editUser = (userData: User) => {
    setShow(true);
    setEditUserData(userData);
  }

  const updateUserData = (updatedUser: User) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    setShow(false);
  }


  return (
    <>
      <Table striped bordered hover responsive className="border border-1 rounded text-center">
        <thead>
          <tr>
            <th>
              <input
                ref={selectAllRef}
                type="checkbox"
                className="form-check-input"
                id="selectAll"
                onChange={toggleSelectAllOnPage}
              />
            </th>
            {tableHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currUsers.map((data, idx) => (
            <tr key={data.id ?? idx}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isSelected(data.id)}
                  onChange={() => toggleRow(data.id)}
                />
              </td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
              <td className="d-flex justify-content-evenly">
                <button className="btn btn-outline-primary btn-sm" onClick={() => editUser(data)}>
                  <i className="bi bi-pencil-square me-1"></i>
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteUser(data.id)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-between mt-2">
        <button className="btn btn-danger" onClick={deleteSelected}>
          Delete Selected
        </button>
        {totalPages > 1 && (
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      <EditModal
        updateUserData={updateUserData}
        userData={editUserData}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export default Usertable;
