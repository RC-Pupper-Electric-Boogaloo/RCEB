import React from "react"
import Matter from 'matter-js'
import { Image } from 'react-native'

const Petchar = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return (
        <Image
            source={props.imageSource}
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
                resizeMode: 'stretch'
            }}
        />
    )
}

export default (world, label, color, pos, size, imageSource) => {
    const initialPetchar = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: label,
        }
    )
    Matter.World.add(world, initialPetchar)

    return {
        body: initialPetchar,
        color,
        pos,
        imageSource,
        renderer: <Petchar />
    }
}