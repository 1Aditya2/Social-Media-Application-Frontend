import React from 'react'
import user from '../../Assets/user.png'
import '../avatar/Avatar.scss'
function Avatar({src}) {
  return (
    <div className='avatar' >
        <img src={src ? src:user} alt="Avatar's image" />
    </div>
  )
}

export default Avatar