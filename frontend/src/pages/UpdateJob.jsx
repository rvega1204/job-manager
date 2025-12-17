/**
 * UpdateJob Page
 * Handles editing and deleting existing job postings
 * @component
 */

import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import { useEffect, useState } from 'react'
import logo from '../assets/letter-j.png'

/**
 * Renders the job edit form with delete confirmation modal
 * Fetches job data on mount and allows users to:
 * - Edit company, position, and status
 * - Delete job with confirmation modal
 * @returns {JSX.Element} Update job page component
 */
const UpdateTask = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles job edit form submission
   * @param {Event} e - Form submit event
   */
  const editJob = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const dataObj = Object.fromEntries(data)

    try {
      await axiosInstance.patch(`/jobs/${id}`, dataObj);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Opens the delete confirmation modal
   */
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  /**
   * Closes the delete confirmation modal
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Confirms and executes job deletion
   */
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/jobs/${id}`);
      setShowModal(false);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setShowModal(false);
    }
  };

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.log(err);
      }
    }

    getJob();
  }, [id]);

  return (
    <>
      <div className="text-center mt-5">
        <form style={{ maxWidth: '300px', margin: 'auto' }} onSubmit={editJob}>
          <Link to="/dashboard">
            <img className="mt-4 mb-4" src={logo} height="72px" />
          </Link>
          <input
            className="form-control"
            type="text"
            name="company"
            placeholder="Company"
            defaultValue={job.company}
            required
          />
          <input
            className="form-control mt-2"
            type="text"
            name="position"
            placeholder="Position"
            defaultValue={job.position}
            required
          />
          <select name="status" className="form-control mt-2" defaultValue={job.status}>
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </select>
          <div className="mt-4">
            <button type="submit" className="btn btn-dark w-100 btn-lg mb-2">
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="btn btn-danger w-100 btn-lg"
            >
              Delete
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this job?</p>
              <p className="text-muted mb-0">
                <strong>{job.position}</strong> at <strong>{job.company}</strong>
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  )
}
export default UpdateTask
