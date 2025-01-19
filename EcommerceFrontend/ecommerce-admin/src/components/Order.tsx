import React from 'react'

const Order :React.FC= () => {
  return (
    <div className="p-4 mx-2 my-2 bg-slate-50 max-w-[300px] rounded shadow-sm">
          <h4 className='text-xl'>Product Order</h4>
          <p className='font-bold'>Status: Pending:30</p>
          <p className='font-bold'>Status: Confirm:20</p>
    </div>
  )
}

export default Order
