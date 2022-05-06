import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3/dist/web3.min.js'
import contract from '../ContractABI/contractABI.json'
import NumberFormat from 'react-number-format'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.css'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import DataTable from 'react-data-table-component'

const Dashboard = () => {
  const [value, setValue] = useState('')
  const [contractTotalSupply, setcontractTotalSupply] = useState()
  const [contractSymbol, setcontractSymbol] = useState()
  const [contractDecimal, setcontractDecimal] = useState()
  const [data, setData] = useState(null)
  const [walletData, setWalletData] = useState(null)
  const [tokenSummary, setTokenSummary] = useState(null)
  const [getTaglist, setTaglist] = useState(null)
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
  useEffect(() => {
    async function getTagList() {
      try {
        const res = await axios.get('https://ledger.tagdev.info/v1/summary/getRanksSimple/0/10')
        setTaglist(res.data)
        console.log(res.data)
      } catch (err) {
        setError(err.message)
        setTaglist(null)
      } finally {
        setLoading(false)
      }
    }
    getTagList()
  }, [])
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
  if (loading || !data || !closeUSDBNB || !getTaglist) return 'Loading...'
  if (error) return 'Error!'
  console.log(getTaglist['data'])
  const columns = [
    {
      name: 'Id',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Grade',
      selector: (row) => row.grade,
      sortable: true,
    },
    {
      name: 'Last Index',
      selector: (row) => row.last_index,
      sortable: true,
    },
    {
      name: 'Rank',
      selector: (row) => row.rank,
      sortable: true,
    },
    {
      name: 'String',
      selector: (row) => row.string,
      sortable: true,
    },
  ]
  const walletAddress = (e) => {
    if (value.length == 42) {
      try {
        axios.get('https://ledger.tagdev.info/v1/summary/getWallet/' + value).then((res) => {
          setWalletData(res.data)
        })
        axios
          .get('https://tagcoin-api-mainnet.herokuapp.com/v1/summary/mytokens/' + value + '/1')
          .then((res2) => {
            setTokenSummary(res2.data)
          })
      } catch (err) {
        setError(err.message)
        setWalletData(null)
        setTokenSummary(null)
      }
    }

    if (!walletData) return ''
    if (!tokenSummary) return ''
    console.log(walletData[0]['mined'])
    console.log(tokenSummary)
  }
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
        <CCol sm={12}>
          <div className="App">
            <div className="card">
              <DataTable
                title=""
                columns={columns}
                data={getTaglist['data']}
                defaultSortFieldID={1}
              />
            </div>
          </div>
        </CCol>
        <br></br>
        <CCol sm={12}>
          <div className="App">
            <div className="form">
              <label>Wallet Address </label>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                }}
              />
              <button onClick={walletAddress}>Submit</button>
            </div>
          </div>
        </CCol>
        <CCol sm={12}>
          {!walletData ? (
            'Not Found'
          ) : (
            <p>
              Id: {+' ' + walletData[0]['_id']} <br></br> Mined: {walletData[0]['mined']} <br></br>
              Minted: {+' ' + walletData[0]['minted']} <br></br> Staked:{' '}
              {+' ' + walletData[0]['staked']} <br></br> Unminted:{' '}
              {+' ' + walletData[0]['unminted']} <br></br> updated:{' '}
              {+' ' + walletData[0]['updated']} <br></br>
            </p>
          )}
          {!tokenSummary ? (
            'Not Found'
          ) : (
            <p>
              Token Id: {tokenSummary['data'][0]['_id']}
              <br></br>
              Hashtag: {tokenSummary['data'][0]['hashtag']}
              <br></br>
              Owner: {tokenSummary['data'][0]['owner']}
              <br></br>
              TimeStamp: {tokenSummary['data'][0]['timestamp']}
              <br></br>
              Transaction Hash: {tokenSummary['data'][0]['transactionHash']}
            </p>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
