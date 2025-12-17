/**
 * JobCard Component
 * Displays a single job posting in a card format with edit functionality
 * @component
 */

import { useNavigate } from 'react-router-dom'

/**
 * Renders a job card showing company, position, and status information
 * @param {Object} props - Component props
 * @param {Object} props.job - Job object containing job details
 * @param {string} props.job._id - MongoDB ObjectId of the job
 * @param {string} props.job.company - Company name
 * @param {string} props.job.position - Job position/title
 * @param {string} props.job.status - Application status (pending/interview/declined)
 * @returns {JSX.Element} Job card component
 */
const JobCard = ({ job }) => {
  const navigate = useNavigate()
  return (
    <div
      className="bg-light text-center p-3 rounded-2"
      style={{ width: '300px' }}
    >
      <p>Company: {job.company}</p>
      <p>Position: {job.position}</p>
      <p>Status: {job.status}</p>
      <button
        onClick={() => navigate(`/jobs/${job._id}/edit`)}
        className="btn btn-md w-75 btn-dark"
      >
        Edit
      </button>
    </div>
  )
}
export default JobCard
