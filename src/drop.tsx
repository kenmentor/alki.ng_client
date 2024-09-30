<img src={image} alt="" onClick={hide} onDoubleClick={toggle_d}/>
    <div className="sub">
    <div className="detial_box">
      <div className="title">
        {title}
      </div>
      <div className="destination">
        <div className="state">{state}</div>
        <div className="location">{localgovement}</div>
        <div className="time">{data}</div>
      </div>
    </div>
    <div className="action_btn">
      <button className='view_details' onClick={toggle_d}>{full_d?'hide detials':'view details'}</button> 
      <button className='social_media' onClick={toggle_social_media}><img src="public\more2.png" alt="" /></button>
      <div className="direct_chat" style={!social_media?{transform:'scale(0)'}:{transform:'scale(1)'}}>
      <div className="media">
        w
      </div>
      <div className="media">
        <a href="htttps://wa.me/2349117264336">r mkk</a>
      </div>
      <div className="media">
        g
      </div>
    </div>
    </div>
    
    </div>
    {/*full_d?<div className="full_description">
      <button className='cancel' onClick={toggle_d}>x</button>
      <div className="map">
      <div style={{width: '100%',borderRadius:'5px'}}><iframe width="100%" height="150" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
        <a href="https://www.gps.ie/">gps trackers</a>
        </iframe></div>
      </div>
      <ul className='detail'>
        <h2 className='full_title'>{title}</h2>
        <li><span>state:</span>{state}.{country}</li>
        <li><span>pay:</span>{price}</li>
        <div className="short_descript">
         <p>{description}</p>
        </div>
      </ul>

    </div> : <></>*/}