import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3/dist/web3.min.js'
import contract from './contractABI.json'
import NumberFormat from 'react-number-format'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CBadge,
  CTooltip,
  CLink,
} from '@coreui/react'

const getBadge = (status) => {
  switch (status) {
    case 'Success':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Error':
      return 'danger'
    case 'Claim':
      return 'secondary'
    default:
      return 'primary'
  }
}
const Dashboard = () => {
  const [contractTotalSupply, setcontractTotalSupply] = useState()
  const [contractSymbol, setcontractSymbol] = useState()
  const [contractDecimal, setcontractDecimal] = useState()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [closeUSDBNB, setcloseUSDBNB] = useState(null)
  const contractAddress = '0x717fb7B6d0c3d7f1421Cc60260412558283A6ae5'
  const rpcURL = 'https://bsc-dataseed1.binance.org:443'
  const web3 = new Web3(rpcURL)
  const contractMethod = new web3.eth.Contract(contract, contractAddress)
  contractMethod.methods.totalSupply().call((err, result) => {
    setcontractTotalSupply(web3.utils.fromWei(result, 'ether'))
  })
  contractMethod.methods.symbol().call((err, result) => {
    setcontractSymbol(result)
  })
  contractMethod.methods.decimals().call((err, result) => {
    setcontractDecimal(result)
  })
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('https://tagdev.info/v1/summary/')
        setData(response.data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])
  console.log(data)
  useEffect(() => {
    async function getUSDBNBData() {
      try {
        const res = await axios.get('https://tagdev.info/v1/summary/get24MarketStat')
        setcloseUSDBNB(res.data)
        console.log(res.data)
      } catch (err) {
        setError(err.message)
        setcloseUSDBNB(null)
      } finally {
        setLoading(false)
      }
    }
    getUSDBNBData()
  }, [])
  if (loading || !data || !closeUSDBNB) return 'Loading...'
  if (error) return 'Error!'
  const treasuryData = [
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Success',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Error',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Success',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Success',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Error',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Success',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Success',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
    {
      txnHash: '0x134107...',
      method: 'Claim',
      status: 'Error',
      block: '1456876',
      age: '2 mins ago',
      from: '0x134107...',
      inOut: 'IN',
      to: '0x134107...',
      value: '1.978687 BNB',
      txnFee: '0.001233',
    },
  ]
  return (
    <>
      <CRow>
        <CCol xs>
          <CCardBody>
            <CRow>
              <CCol xs={12} md={6} xl={6}>
                <CCard>
                  <CCardBody>
                    <CRow>
                      <div className="fs-6 fw-semibold">Overview</div>
                      <hr className="mt-0" />
                      <CCol sm={6}>
                        <div className="border-start-4 border-start-info py-1 px-3">
                          <div className="text-medium-emphasis small fw-semibold">PRICE</div>
                          <div className="small">
                            <NumberFormat
                              value={closeUSDBNB[0].close_usd}
                              displayType={'text'}
                              prefix={'$'}
                              decimalScale={2}
                            />{' '}
                            @{' '}
                            <NumberFormat
                              value={closeUSDBNB[0].close_bnb}
                              displayType={'text'}
                              prefix={'$'}
                              decimalScale={6}
                            />{' '}
                            BNB
                          </div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small fw-semibold">
                            FULLY DILUTED MARKET CAP
                          </div>
                          <div className="small">
                            <NumberFormat
                              value={closeUSDBNB[0].close_usd * contractTotalSupply}
                              displayType={'text'}
                              prefix={'$'}
                              thousandSeparator={true}
                              decimalScale={2}
                            />
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                    <hr className="mt-0" />
                    <div className="progress-group">
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small fw-semibold">
                          Total Supply:
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="small">
                          <NumberFormat
                            value={contractTotalSupply}
                            displayType={'text'}
                            decimalScale={6}
                            thousandSeparator={true}
                          />{' '}
                          {contractSymbol}
                        </div>
                      </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="progress-group">
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small fw-semibold">Holders:</span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="small">
                          <NumberFormat
                            value={data.holders}
                            displayType={'text'}
                            thousandSeparator={true}
                          />{' '}
                          addresses
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol xs={12} md={6} xl={6}>
                <CCard>
                  <CCardBody>
                    <CRow>
                      <div className="fs-6 fw-semibold">Profile Summary</div>
                      <hr className="mt-0" />
                    </CRow>
                    <div className="progress-group">
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small fw-semibold">Contract:</span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="small">
                          <a
                            href="https://bscscan.com/address/0x717fb7B6d0c3d7f1421Cc60260412558283A6ae5"
                            className="link-primary"
                          >
                            0x717fb7B6d0c3d7f1421Cc60260412558283A6ae5
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="progress-group">
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small fw-semibold">Decimals:</span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="small">{contractDecimal}</div>
                      </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="progress-group">
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small fw-semibold">
                          Official Site:
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="small">
                          <a href="https://www.tagprotocol.com/" className="link-primary">
                            https://www.tagprotocol.com/
                          </a>
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6}>
          <CCard className="mb-4">
            <CCardHeader>Tagcoin</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Txn Hash</CTableHeaderCell>
                    <CTableHeaderCell>Method</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Block</CTableHeaderCell>
                    <CTableHeaderCell>Age</CTableHeaderCell>
                    <CTableHeaderCell>From</CTableHeaderCell>
                    <CTableHeaderCell>To</CTableHeaderCell>
                    <CTableHeaderCell>Value</CTableHeaderCell>
                    <CTableHeaderCell>txnFee</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {treasuryData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>
                          <a href="#" className="link-primary">
                            {item.txnHash}
                          </a>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getBadge(item.method)}>{item.method}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.block}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.age}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <a href="#" className="link-primary">
                            {item.from}
                          </a>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CTooltip
                          content="0x1341079976c2358637b488614cbde4ca5942a8b229b64b65f81366ceff47b3f5"
                          placement="top"
                        >
                          <CLink>{item.to}</CLink>
                        </CTooltip>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.value}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.txnFee}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6}>
          <CCard className="mb-4">
            <CCardHeader>Tagcoin</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Txn Hash</CTableHeaderCell>
                    <CTableHeaderCell>Method</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Block</CTableHeaderCell>
                    <CTableHeaderCell>Age</CTableHeaderCell>
                    <CTableHeaderCell>From</CTableHeaderCell>
                    <CTableHeaderCell>To</CTableHeaderCell>
                    <CTableHeaderCell>Value</CTableHeaderCell>
                    <CTableHeaderCell>txnFee</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {treasuryData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>
                          <a href="#" className="link-primary">
                            {item.txnHash}
                          </a>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getBadge(item.method)}>{item.method}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.block}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.age}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <a href="#" className="link-primary">
                            {item.from}
                          </a>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CTooltip
                          content="0x1341079976c2358637b488614cbde4ca5942a8b229b64b65f81366ceff47b3f5"
                          placement="top"
                        >
                          <CLink>{item.to}</CLink>
                        </CTooltip>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.value}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.txnFee}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
