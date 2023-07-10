import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const SinglePokemon = ({ pokemons, chosePokemon }) => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  const targetPokemon = pokemons.find((pokemon) => {
    return pokemon.id === Number(id); 
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setImage(data);
        console.log(data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  if (!image) {
    return <h1>Image is loading...</h1>;
  }

  if (!targetPokemon) {
    return <div>No such Pokemon!</div>;
  }

  return (
    <Card 
      className="one-poke-card"
    >
      <Card.Header className="one-poke-header">
        {targetPokemon.name.english}
      </Card.Header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div>
        <Card.Img 
          variant="top" 
          src={image.sprites.front_default}
          style={{
            width: '100%'
          }}
        />
      </div>
      <Card.Body className="onepoke-card">
        <div className="pokelist">
          <Card.Text className="one-poke-skills">Skills</Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item className="one-poke-item">
                HP: {targetPokemon.base.HP}
              </ListGroup.Item>
              <ListGroup.Item className="one-poke-item">
                Attack: {targetPokemon.base.Attack}
              </ListGroup.Item>
              <ListGroup.Item className="one-poke-item">
                Defense: {targetPokemon.base.Defense}
              </ListGroup.Item>
              <ListGroup.Item className="one-poke-item">
                Speed: {targetPokemon.base.Speed}
              </ListGroup.Item>
            </ListGroup>
        </div>
      </Card.Body>
      </div>
      <Link
          to={`/arena`}
          className="one-poke-fight"
          onClick={chosePokemon}
          payload={id}
        >
          FIGHT
        </Link>
    </Card>
  );
};

export default SinglePokemon;
