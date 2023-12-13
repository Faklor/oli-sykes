import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
]

const DashGraph = ()=>{
    return(
        <>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={''}
            activeShape={''}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            // onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
        </>
    )
}

export default DashGraph