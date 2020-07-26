import React, {useState} from 'react'

const Rasamati = () => {

  const [puli, setPuli] = useState([
    {
      id:1,
      name: 'pula1',
      active: false
    },
    {
      id:2,
      name: 'pula2',
      active: false
    },
    {
      id:3,
      name: 'pula3',
      active: false
    },
  ])

  const handleClick =  (item, index) => {
    setPuli(prevState => {
      const results = prevState.map((_item, _index) => {
        var returnValue = {..._item}

        if(_index === index ) {
          returnValue.active = !returnValue.active
        }

        return returnValue
      }) 

      return results
    })
  }

  return(
    <div>
    {
      puli.map((item, index) => 
        <div key={item.id} onClick={() => handleClick(item, index)}>
          {item.name} - {item.active && 'item is active'}
        </div>
      )
    }
    </div>
  )
}

export default Rasamati