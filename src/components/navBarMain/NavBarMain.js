import { FileEarmarkSpreadsheet,PersonCircle } from 'react-bootstrap-icons';

import './_navBar.scss'
export const NavBarMain=(props)=>{
    return(
        <div className='navBar__container'>
            <h4>{props.title}</h4>
            <div className='navBar__items'>
                <FileEarmarkSpreadsheet size={24}></FileEarmarkSpreadsheet>
                <div className='navBar__perfil'>
                    <PersonCircle size={24}></PersonCircle>
                    <h6>{props.name}</h6>
                </div>
            </div>
        </div>
    )
}