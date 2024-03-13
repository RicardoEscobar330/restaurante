import React from 'react';
import {app, auth, db, storage} from './src/config/util/firebaseConnection';
import Navigation from './src/modules/navigation/Navigation';


export default function App() {
  return(
    <Navigation></Navigation>
  )
}


// Este el punto de partida de la aplicación
