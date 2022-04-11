import React, { useEffect, useState } from 'react'
import { CCol, CRow, CAlert } from '@coreui/react'
import NumberFormat from 'react-number-format'
import contract from '../../ContractABI/contractABI.json'
import contractHTagABI from '../../ContractABI/contractHTagABI.json'
import Web3 from 'web3/dist/web3.min.js'
import axios from 'axios'

const ButtonGroups = () => {
  const [contractTotalSupply, setcontractTotalSupply] = useState()
  const [getHTagRegistered, setHTagRegistered] = useState(null)
  const [getId, setId] = useState(null)
  const [getTagMiner, setTagMiner] = useState(null)
  const [getStakedItem, setStakedItem] = useState(null)
  const [getMarketStat, setMarketStat] = useState(null)
  const [getSummary, setSummary] = useState(null)
  const baseURL = 'https://ledger-trans.tagdev.info/v1/summary/getLastIndexed/last'
  const stakedItem = 'https://pl-transactions.herokuapp.com/v1/summary/getSummary'
  const contractAddress = '0x717fb7B6d0c3d7f1421Cc60260412558283A6ae5'
  const contractHTagAddress = '0x4db89cB01EB60F3b1D04300e5C408D23Ebbe615B'
  const rpcURL = 'https://bsc-dataseed1.binance.org:443'
  const web3 = new Web3(rpcURL)
  const contractMethod = new web3.eth.Contract(contract, contractAddress)
  contractMethod.methods.totalSupply().call((err, result) => {
    setcontractTotalSupply(web3.utils.fromWei(result, 'ether'))
  })
  const contractHTagRegistered = new web3.eth.Contract(contractHTagABI, contractHTagAddress)
  contractHTagRegistered.methods.currentCtr().call((err, result) => {
    setHTagRegistered(web3.utils.fromWei(result, 'wei'))
  })
  useEffect(() => {
    async function getTagMiner() {
      try {
        const response = await axios.get('https://tagcoin-api-mainnet.herokuapp.com/v1/summary')
        setTagMiner(response.data)
      } catch (err) {
      } finally {
      }
    }
    getTagMiner()
    const interval = setInterval(() => {
      getTagMiner()
    }, 50000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    async function getSummary() {
      try {
        const response = await axios.get('https://tagdev.info/v1/summary/')
        setSummary(response.data)
      } catch (err) {
      } finally {
      }
    }
    getSummary()
    const interval = setInterval(() => {
      getSummary()
    }, 50000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    async function marketStat() {
      try {
        const response = await axios.get('https://tagdev.info/v1/summary/get24MarketStat')
        setMarketStat(response.data)
      } catch (err) {
      } finally {
      }
    }
    marketStat()
    const interval = setInterval(() => {
      marketStat()
    }, 50000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    async function getID() {
      try {
        const response = await axios.get(baseURL)
        setId(response.data)
      } catch (err) {
      } finally {
      }
    }
    getID()
    const interval = setInterval(() => {
      getID()
    }, 50000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    async function getStakedCount() {
      try {
        const abc = getId['id']
        const response = await axios.get(`${stakedItem}/${abc}`)
        setStakedItem(response.data)
      } catch (err) {
      } finally {
      }
    }
    getStakedCount()
    const interval = setInterval(() => {
      getStakedCount()
    }, 50000)
    return () => clearInterval(interval)
  }, [getId])
  if (!getId) return ' '
  if (!getStakedItem) return ' '
  if (!getMarketStat) return ' '
  if (!getSummary) return ' '
  if (!getTagMiner) return ' '
  return (
    <CRow>
      <CCol xs={6}>
        <CRow>
          <CCol sm={12}>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">PRICE</div>
                <div className="small">
                  <NumberFormat
                    value={getMarketStat[0]['close_usd']}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={4}
                  />{' '}
                  USD/TAGS
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">TAG HOLDERS</div>
                <div className="small">
                  <NumberFormat
                    value={getSummary['holders']}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">HIGH (24 HOURS)</div>
                <div className="small">
                  <NumberFormat
                    value={getMarketStat[0]['high_usd']}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={4}
                    prefix={'$'}
                  />
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">LOW (24 HOURS)</div>
                <div className="small">
                  <NumberFormat
                    value={getMarketStat[0]['low_usd']}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={4}
                    prefix={'$'}
                  />
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">VOLUME (24 HOURS)</div>
                <div className="small">
                  <NumberFormat
                    value={getMarketStat[0]['tagvol_tag']}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={0}
                  />
                </div>
              </div>
            </CAlert>
          </CCol>
        </CRow>
      </CCol>
      <CCol xs={6}>
        <CRow>
          <CCol sm={12}>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">HASHTAGS REGISTERED</div>
                <div className="small">
                  <NumberFormat
                    value={getHTagRegistered}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">STAKED STAKED</div>
                <div className="small">
                  <NumberFormat
                    value={getStakedItem['count']}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">TAG MINERS</div>
                <div className="small">
                  <NumberFormat
                    value={getTagMiner['wallets'] - 1}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">TOTAL SUPPLY</div>
                <div className="small">
                  <NumberFormat
                    value={contractTotalSupply}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={2}
                  />{' '}
                  TAGS
                </div>
              </div>
            </CAlert>
            <CAlert color="light">
              <div className="d-flex justify-content-between">
                <div className="text-medium-emphasis small fw-semibold">CIRCULATING SUPPLY</div>
                <div className="small">
                  <NumberFormat
                    value={getSummary['supply']}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={2}
                  />{' '}
                  TAGS
                </div>
              </div>
            </CAlert>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default ButtonGroups
