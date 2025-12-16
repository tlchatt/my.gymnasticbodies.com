import React from 'react';
import './gbIcons.scss';

import { NavLink } from 'react-router-dom';


export const LogoLink= (props) => {

  let addClass =  '';
  let borderRight = '';
  if(props.footerColor){
    addClass ='gf-footer';
    borderRight = 'gf-footer-border'
  }

  return (
    <NavLink className="header-logo-link" to="/" exact>
      <i className={`gb-icon gb-mark ${addClass} ${borderRight}`}></i>
      <i className={`gb-icon gb-gymfit-by ${addClass}`}></i>
    </NavLink>
  )
}

export const HeroLogo=  () => {
  return (
    <div className="header-hero-link">
      <i className="gb-icon gb-mark"></i>
      <i className="gb-icon gb-gymfit"></i>
    </div>
  )
}

export const GBWhiteHero = () => {
  return (
    <div className="header-hero-link-free">
      <i className="gb-icon gb-white"></i>
      <i className="gb-icon gb-gymfit-by"></i>
    </div>
  )
}

export const Vegtables = () => <i className="gb-icon gb-thrive"></i>

export const Mobility = props => <i {...props} className={`gb-icon gb-mobility ${props.className}`}></i>

export const GbWhite = () => <i className="gb-icon gb-white"></i>

export const GbPref = () => <i className="gb-icon gb-pref"></i>
export const GbHistory = () => <i className="gb-icon gb-history"></i>
export const GbHistoryReg = () => <i className="gb-icon gb-history-reg"></i>
export const GbCurl = () => <i className="gb-icon gb-curl" style={{width: '24px', textAlign: 'center'}}></i>
export const GbWorkout = () => <i className="gb-icon gb-workout"></i>


