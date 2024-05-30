import Pokemon from "@/model/pokemon";
import { Row, Col, Container, Image } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
type Props ={
   pokemon: Pokemon;
}


import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';


function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <button
        type="button"
        style={{ backgroundColor: 'pink' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }
  


export default function PokemonComponent(props : Props) {
   const {pokemon} = props;

   const renderFamily = () => {
    return pokemon.evolutionFamily.map((familyMember, index) => {
      let badgeText = "";
      badgeText = (familyMember === pokemon.devolution) ? "Devolution" : 
                   (familyMember === pokemon.evolution) ? "Evolution" : "Current";
      return (
        <ListGroup.Item key={index}>
          {familyMember} <Badge bg={badgeText === 'Current' ? 'primary' : badgeText === 'Devolution' ? 'danger' : 'success'}>{badgeText}</Badge>
        </ListGroup.Item>
      );
    });
  };
   return (
       <Container>
           <Row className="justify-content-md-center">
               <Col md="auto"><h1>{pokemon.pokemonName}</h1></Col>
           </Row>
           <Row>
               <Col>
                   <Image src={pokemon.mainImage} alt = "pokemon" thumbnail />
               </Col>
               <Col>
               <b>Pokémon Properties</b>
            
                   <Row>Attack:<ProgressBar variant="success" now={pokemon.attack} label={`${pokemon.attack}`} /></Row>
                   <Row>Defense:<ProgressBar variant="info" now={pokemon.defense} label={`${pokemon.defense}`} /></Row>
                   <Row>Health Points:<ProgressBar variant="danger"now={pokemon.healthPoints} label={`${pokemon.healthPoints}`} /></Row>
                   <Row>Speed:<ProgressBar variant="warning"now={pokemon.speed} label={`${pokemon.speed}`} /></Row>
                   <Row><br></br></Row>
                   <Row>


                   <Accordion>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">Pokemon types</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <ListGroup>
           {
            pokemon.pokemonType.map(function(data){
                return (
                    <ListGroup.Item>{data}</ListGroup.Item>
                  )
            })}
 
    </ListGroup>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="1">Evaluation family</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>

          <ListGroup>
          {renderFamily()}
           {/* {
            pokemon.evolutionFamily.map(function(data){
                return (
                    <ListGroup.Item>{data}</ListGroup.Item>
                  )
            })} */}
 
    </ListGroup>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>

                   </Row>
               </Col>
           </Row>
       </Container>
   );
}
