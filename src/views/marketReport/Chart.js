import React, { useEffect, useRef, useState } from 'react'
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom'
const Chart = (PropTypes) => {
  const chartId = PropTypes.chartId
  const dateFilter = PropTypes.filter
  const height = PropTypes.height
  const width = PropTypes.width
  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-public-ledger-kqaxf',
  })
  const chartDiv = useRef(null)
  const [rendered, setRendered] = useState(false)
  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      height: height,
      width: width,
      autoRefresh: true,
    }),
  )
  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log('Error during Charts rendering.', err))
  }, [chart])

  useEffect(() => {
    if (rendered) {
      chart
        .setFilter({
          time: { $gt: new Date(dateFilter) },
        })
        .catch((err) => console.log('Error while filtering.', err))
    }
  }, [chart, dateFilter, rendered])
  return <div className="chart" ref={chartDiv} />
}
export default Chart
