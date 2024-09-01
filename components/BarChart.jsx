import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const Barchart = ({BudgetList}) => {
  return (
    <>
        <div className='border rounded-lg p-5'>
            <h2 className='font-bold text-lg mb-5'>Activity</h2>
            <ResponsiveContainer width={300} height={300}>
              <BarChart
                  width={300}
                  height={300}
                  data={BudgetList}
                  >
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="totalSpend" stackId="a" fill='#4845d2'/>
                  <Bar dataKey="amount" stackId="a" fill='#C3C2FF'/>
                  {/* <Bar dataKey="totalSpend" stackId="a" fill='#4845d2'/> */}
              </BarChart>
            </ResponsiveContainer>
        </div>
    </>
  )
}

export default Barchart