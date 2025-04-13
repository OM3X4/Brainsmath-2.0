import React from 'react'
import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'

// Default values shown




function Loading() {
    return (
        <div className='w-screen h-[calc(100vh-15rem)] flex justify-center items-center'>
            <Infinity
                size="120"
                stroke="10"
                strokeLength="0.15"
                bgOpacity="0.1"
                speed="1.3"
                color="#5a65ea"
            />
        </div>
    )
}

export default Loading