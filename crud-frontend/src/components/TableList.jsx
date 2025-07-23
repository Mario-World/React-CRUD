import React from 'react'

const TableList = ({onOpen}) => {
   
    const tableData = [
        {id: 1, name: "John Doe", email:"John.Doe@gmail.com", job: "Developer", rate: "100" , status: true},
        {id: 2, name: "harty hargerty", email:"John.Doe2@gmail.com", job: "Desktop Technican", rate: "150" , status: true},
        {id: 3, name: "Brice Swyre", email:"John.Doe3@gmail.com", job: "Tax Accountant", rate: "200" , status: false},
      
      ];

    return ( 
        <div className="overflow-x-auto mt-10">
  <table className="table">
    {/* head */}
    <thead>
    

    
      <tr>
        <th>id</th>
        <th>name</th>
        <th>Email</th>
        <th>Job</th>
        <th>Rate</th>
        <th>Status</th>
      </tr>
    
    </thead>

    <tbody className="hover">
      {/* row 1 */}
      {tableData.map((item) => (

      <tr key={item.id} className ="hover">
        <th>{item.id}</th>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.job}</td>
         <td>{item.rate}</td>

          <td>
          <button className={`btn rounded-full w-20 ${item.status ? `btn-primary`: `btn-outline btn-primary`}`}> 
             {item.status ? 'Active' : "Inactive"}
          </button>
          </td>
          <td>
               <button className ="btn btn-secondary" onClick={onOpen}>Update</button>
          </td>
          <td>
               <button className ="btn btn-accent">Delete</button>
          </td>
       </tr>
    ))}
      
    
    </tbody>
  </table>
</div>
    )
}

export default TableList;