import Container  from "@material-ui/core/Container";
import Box from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {CardActions, Divider} from "@material-ui/core";


const stylesContainer = {
    marginTop: '10%',
}
const dFlexAroundmt5 = {
    display : 'flex',
    justifyContent : 'space-around',
    marginTop: '5%'
}

const dFlexAround = {
    display : 'flex',
    justifyContent : 'space-around',
}

const dFlexCenter = {
    display : 'flex',
    justifyContent : 'center'
}

const btnStyle = {
    backgroundColor : 'blue',
    borderColor : 'white',
    borderRadius : '0%',
    borderStyle : 'solid',



}

const displayBtn = {
    textAlign: 'center',

}

const mt5 = {
    marginTop: '5%'
}

const txtCenter = {
    textAlign : 'center',
}

const card = {
    width : '41%',
    height : '120px',
}

const AdminDash = (props) => {
    return (
       <Container style={stylesContainer}>
       <h1> Espace Adminsitration</h1>

           <div style={dFlexAround}>
               <Card style={card}>
                   <CardContent>
                   <Typography style={txtCenter} variant="p" component="p">
                      Consultez les signalements des ressources
                   </Typography>
                       <div style={displayBtn}>
                           <CardActions style={dFlexCenter}>

                           <Button style={btnStyle} variant="contained" color="primary" href="#contained-buttons">
                               Consulter
                           </Button>

                       </CardActions>
                       </div>
               </CardContent>
               </Card>
               <Card style={card}>
                   <CardContent>
                       <Typography style={txtCenter} variant="p" component="p">
                           Consultez les ressources bloquées
                       </Typography>
                       <div style={displayBtn}>
                       <CardActions style={dFlexCenter}>

                           <Button style={btnStyle} variant="contained" color="primary" href="#contained-buttons">
                               Consulter
                           </Button>

                       </CardActions>
                       </div>
                   </CardContent>
               </Card>
           </div>
           <div style={dFlexAroundmt5}>
               <Card style={card}>
                   <CardContent>
                       <Typography style={txtCenter} variant="p" component="p">
                           Consultez les signalements des utilisateurs
                       </Typography>
                       <div style={displayBtn}>
                           <CardActions style={dFlexCenter}>

                               <Button style={btnStyle} variant="contained" color="primary" href="#contained-buttons">
                                   Consulter
                               </Button>

                           </CardActions>
                       </div>
                   </CardContent>
               </Card>
               <Card style={card}>
                   <CardContent>
                       <Typography style={txtCenter} variant="p" component="p">
                           Consultez les utilisateurs bloqués
                       </Typography>
                       <div style={displayBtn}>
                           <CardActions style={dFlexCenter}>

                               <Button style={btnStyle} variant="contained" color="primary" href="/blockedUser">
                                   Consulter
                               </Button>

                           </CardActions>
                       </div>
                   </CardContent>
               </Card>
           </div>
           <div style= {dFlexAroundmt5}>
               <Card style={card}>
                   <CardContent>
                       <Typography style={txtCenter} variant="p" component="p">
                           Consultez les Avertissements
                       </Typography>
                       <div style={displayBtn}>
                           <CardActions style={dFlexCenter}>

                               <Button style={btnStyle} variant="contained" color="primary" href="#contained-buttons">
                                   Consulter
                               </Button>

                           </CardActions>
                       </div>
                   </CardContent>
               </Card>
               <Card style={card}>
                   <CardContent>
                       <Typography style={txtCenter} variant="p" component="p">
                           Gestion des catégories
                       </Typography>
                       <div style={displayBtn}>
                           <CardActions style={dFlexCenter}>

                               <Button style={btnStyle} variant="contained" color="primary" href="/categTools">
                                   Consulter
                               </Button>

                           </CardActions>
                       </div>
                   </CardContent>
               </Card>
           </div>
       </Container>
    )
}

export default AdminDash