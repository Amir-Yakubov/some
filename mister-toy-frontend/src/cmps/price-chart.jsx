import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/toy.action.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
const _ = require('lodash')

ChartJS.register(ArcElement, Tooltip, Legend)

export function PriceChart() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const shopLabels = []
    const shopPrices = []

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys() {
        loadToys()
            .then(() => {
                showSuccessMsg('Toys loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    console.log('Before return toys', toys)
    getLabels()


    function getLabels() {
        if (!toys) return
        toys.map(toy => {
            toy.labels.map(label => {
                if (shopLabels.find(shopLabel => shopLabel === label)) return
                shopLabels.push(label)
            })
        })
        console.log(shopLabels)
    }

    console.log('Before return toys', toys)
    getLabels()


    function getLabels() {
        if (!toys) return
        toys.map(toy => {
            toy.labels.map(label => {
                if (shopLabels.find(shopLabel => shopLabel === label)) return
                shopLabels.push(label)
            })
        })
        console.log(shopLabels)

    }

    function getDataFromToys() {
        const mapArray = shopLabels.map(shopLabel => {
            let count = 0
            let priceCount = 0
            toys.map(toy => {
                toy.labels.map(label => {
                    if (label === shopLabel) {
                        count++
                        priceCount += toy.price
                    }
                })
            })
            const avrg = priceCount / count
            return { shopLabel, priceCount, count, avrg }
        })
        console.log('mapArray', mapArray)
        const data = mapArray.map(item => item.avrg)
        console.log('data####@@@@@@@@@##############', data)
        return data
    }

    const data = {
        labels: shopLabels,
        datasets: [
            {
                label: 'avrg price',
                data: getDataFromToys(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    }

    return (
        <div style={{ width: '40%' }}>
            <Doughnut data={data} />
        </div>
    )
}
