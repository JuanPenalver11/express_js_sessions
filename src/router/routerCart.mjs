import { Router } from "express";

const router = Router();

router.get("/api/cart", (request, response) => {
    if(!request.session.user) return response.status(401).send({msg: 'No autorizado'})
    // esta linea impide que la gente no autorizada pueda acceder a ese dominio 
    const { cart } = request.session
    if (cart){ return response.status(200).send(cart)}
    else {
        return response.status(400).send({msg: 'empty cart'})
    }
})

router.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;   
  const { cart } = request.session;
  if (cart) {
    cart.puhs(item);
  } else { 
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

export default router;

// ejemplo de cart en body puedes escribir item: leche, quantity: 20, price: 3.8