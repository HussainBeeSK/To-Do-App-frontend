
import{BiEdit} from 'react-icons/bi'
import {AiFillDelete}from 'react-icons/ai'

const Todolist = ({text,updateMode,deletedata}) => {

  return (
    <div className='todo'>
        <div className='text'>{text}</div>
        <div className='icons'>
            <BiEdit className='icon' onClick={updateMode} />
            <AiFillDelete className="icon"  onClick={deletedata}/>
        </div>
        
    </div>
  )
}

export default Todolist;