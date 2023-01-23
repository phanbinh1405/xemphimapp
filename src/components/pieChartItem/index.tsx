import React from 'react'
import styles from './Chart.module.css'

interface ChartProps {
  voteAverage: number
}

const convertVotePoint = (voteAverage: number) => {
  const point = Number((voteAverage * 10).toFixed(0))
  return {
    point,
    color: point === 0 ? 'none' : point <= 30 ? '#db2360' : point <= 65 ? '#d2d531' : '#5ed8b8',
  }
}

function Chart({ voteAverage }: ChartProps) {
  const { point, color } = convertVotePoint(voteAverage)
  return (
    <svg className='circle-chart' viewBox='0 0 34 34' width='30' height='30' xmlns='http://www.w3.org/2000/svg'>
      <circle
        className='circle-chart__background'
        stroke='#efefef'
        stroke-width='2'
        fill='#081c22'
        cx='16.91549431'
        cy='16.91549431'
        r='15.91549431'
      />
      <circle
        className={styles['circle-chart__circle']}
        stroke={color}
        stroke-width='2'
        stroke-dasharray={`${point}, 100`}
        stroke-linecap='round'
        fill='none'
        cx='16.91549431'
        cy='16.91549431'
        r='15.91549431'
      />
      <g className={styles['circle-chart__info']}>
        {point > 0 ? (
          <>
            <text
              className='circle-chart__percent'
              x='15'
              y='18'
              alignment-baseline='central'
              text-anchor='middle'
              font-size='13'
              fill='white'
              fontWeight='600'
            >
              {point}
            </text>
            <text
              className='circle-chart__percent'
              x='25'
              y='15'
              alignment-baseline='central'
              text-anchor='middle'
              font-size='7'
              fill='white'
            >
              %
            </text>
          </>
        ) : (
          <text
            className='circle-chart__percent'
            x='17'
            y='17'
            alignment-baseline='central'
            text-anchor='middle'
            font-size='13'
            fill='white'
            fontWeight='600'
          >
            NR
          </text>
        )}
      </g>
    </svg>
  )
}

export default React.memo(Chart)
