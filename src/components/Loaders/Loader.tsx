import { ring } from 'ldrs'

ring.register()


const Loader = ({color}:{color?:string})=>{

return(
<l-ring
    size="27"
    stroke="4"
    bg-opacity="0"
    speed="2" 
    color={color || "white"} 
></l-ring>
)    

} 

export {Loader}