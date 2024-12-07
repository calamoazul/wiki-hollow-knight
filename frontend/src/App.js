import React from "react";
import axios from 'axios'
import PageWiki from "./components/PageWiki";

export default class App extends React.Component 
{
  constructor(props){
    super(props);
  } 
  
  
  render()
  {
    const document = new Document();
    return(
        <>
            <html lang="es-ES">
                <head>
                    <title>Wiki Hollow Knight</title>
                    <meta name="description" content="Wiki donde consultar datos sobre el juego Hollow Knight" />
                    <meta name="viewport" content="width=device-width,initial-scale=1" />
                </head>
                <body>
                    <PageWiki />
                </body>
            </html>
        </>
    )
  }
}