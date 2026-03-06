"use client"
import { useGetTodosQuery, useUpdateTodoMutation } from '@/redux/apis/employee.api'
import { TOGGLE_TODO_REQUEST } from '@/types/Employee'
import { format, isBefore } from 'date-fns'
import { toast } from 'react-toastify'


const EmployeeDashboard = () => {
    const { data } = useGetTodosQuery()
    const [update, {isLoading}] = useUpdateTodoMutation()

    const handleUpdate = async (data : TOGGLE_TODO_REQUEST) => {
        try {
            await update(data).unwrap()
            toast.success("Todo update success")
        } catch (error) {
            console.log(error);
            toast.error("unable to update")
            
        }
    }
  return <>
  <div className="container my-5">

      {
    data && <table className='table table-bordered table-hover'>
        <thead>
            <tr>
                <th>_id</th>
                <th>task</th>
                <th>desc</th>
                <th>priority</th>
                <th>employee</th>
                <th>due</th>
                <th>completeDate</th>
                <th>complete</th>
                <th>Is Late</th>
            </tr>
        </thead>
        <tbody>
            {
                data.result.map(item => <tr key={item._id} className={`${ isBefore( item.completeDate || new Date(), item.due ) ? "table-success" : "table-danger "}`}>
                    <td>{item._id}</td>
                    <td>{item.task}</td>
                    <td>{item.desc}</td>
                    <td>{item.priority}</td>
                    <td>{item.employee.name}</td>
                    <td>{format(item.due, 'dd-MMMM-yyyy hh:mm:ss a')}</td>
                    <td>{item.completeDate && format(item.completeDate, "dd-MMMM-yyyy hh:mm:ss a")}</td>
                    <td>{

                        item.complete
                            ? "Completed"
                            : <button 
                                onClick={e => handleUpdate({ _id: item._id, complete : true})} 
                                className='btn btn-success btn-sm'>
                                Mark Complete
                            </button>
                    }</td>
                    <td>
                        {
                            isBefore( item.completeDate || new Date(), item.due )
                            ? <span className="badge text-bg-success">No </span>
                            : <span className="badge text-bg-danger">Yes </span>
                        }
                    </td>
                </tr> )
            }
        </tbody>
    </table>
  }

  </div>
  </>
}

export default EmployeeDashboard