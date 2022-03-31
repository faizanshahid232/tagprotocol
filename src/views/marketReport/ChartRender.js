import React, { useState } from 'react'
import Chart from './Chart'
const ChartRender = () => {
  const [date, setDate] = useState(0)
  return (
    <div className="App">
      <div className="form">
        <label>Strat Date</label>
        <input type="date" id="data-form" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="charts">
        <Chart
          filter={date}
          chartId={'623334fa-a723-490c-8806-784a49572d93'}
          height={'600px'}
          width={'800px'}
        />
      </div>
    </div>
  )
}

export default ChartRender
