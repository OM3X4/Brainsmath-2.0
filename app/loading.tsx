'use client'
import React, { useState, useEffect } from 'react'
import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'
import { Hatch } from 'ldrs/react'
import 'ldrs/react/Hatch.css'
import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'
import { Miyagi } from 'ldrs/react'
import 'ldrs/react/Miyagi.css'

// Default values shown





function Loading() {




    return (
        <div className='w-screen h-[calc(100vh-15rem)] flex justify-center items-center'>
            <LineWobble
                size="200"
                stroke="10"
                bgOpacity="0.1"
                speed="2"
                color="white"
            />
        </div>
    )
}

export default Loading