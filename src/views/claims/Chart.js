import React, { useEffect, useRef, useState } from 'react'
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom'
const Chart = () => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-public-ledger-kqaxf',
  })
  const chartDiv = useRef(null)
  const [chart] = useState(
    sdk.createChart({
      chartId: '6233325f-9c70-4304-8d58-dca1fc59777d',
      height: '600px',
      width: '100%',
    }),
  )
  useEffect(() => {
    chart
      .render(chartDiv.current)
      .catch((err) => console.log('Error during Charts rendering.', err))
  }, [chart])
  return <div className="chart" ref={chartDiv} />
}
export default Chart
