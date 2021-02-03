import Container  from "@material-ui/core/Container";
import Box from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {CardActions} from "@material-ui/core";


const stylesContainer = {
    marginTop: '10%',
}
const dFlexAround = {
    display : 'flex',
    justifyContent : 'space-around'
}

const btnStyle = {
    backgroundColor : 'blue',
    borderColor : 'white',
    borderRadius : '0%',
    borderStyle : 'solid'

}

const displayBtn = {
    marginLeft : '30%'
}

const AdminDash = (props) => {
    return (
       <Container style={stylesContainer}>
           <div style={dFlexAround}>
               <Card>
                   <CardContent>
                   <Typography variant="p" component="p">
                      Consultez les signalements des ressources
                   </Typography>
                       <div style={displayBtn}>
                       <CardActions>

                               <Button style={btnStyle} size="small">Learn More</Button>

                       </CardActions>
                       </div>
               </CardContent>
               </Card>
               <Card>
                   <CardContent>
                       <Typography variant="p" component="p">
                           Consultez les signalements des ressources
                       </Typography>
                       <div style={displayBtn}>
                       <CardActions>

                           <Button style={btnStyle} size="small">Learn More</Button>

                       </CardActions>
                       </div>
                   </CardContent>
               </Card>
           </div>
       </Container>
    )
}

export default AdminDash