import { Drink } from '../Drink';
import { CoffeeMachine } from '../CoffeeMachine';

describe("CoffeeMachine", () => {
  it("should serve coffee if exact money inserted", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 2, false, 10)

    expect(result).toBe("Serving Coffee (small)");
  });

  it("any drink should cost 20% less during the happy hours", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Chocolate", 2.50, false, 0, "large");

    const result = machine.serve(drink, 2.8000000000000004, false, 16);

    expect(result).toBe("Serving Chocolate (large)"); // insane (odmietam komentovať (pun intended))
  });

  it("should serve a Latte and give change if given too much money", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Latte", 3.5, true, 3, "medium");

    const result = machine.serve(drink, 7, false, 16);

    expect(result).toBe("Serving Latte (medium) with change 3.56");
  });

  it("if user sets too much sugar (>5), it shouldn't serve anything, type an error", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Cappuccino", 3, true, 6, "medium");

    const result = machine.serve(drink, 4.1, false, 13);

    expect(result).toBe("Error: too much sugar");
  });

  it("if the price of a drink is below zero the machine should display an error, not serving anything", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Cappuccino", -5, true, 3, "small");

    const result = machine.serve(drink, 4.1, false, 13);

    expect(result).toBe("Error: invalid price");
  });

  it("loyalty members should receive 5th drink for free, if not large", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 0, "small");

    machine.serve(drink, 2, true, 13)
    machine.serve(drink, 2, true, 13)
    machine.serve(drink, 2, true, 13)
    machine.serve(drink, 2, true, 13)
    const result = machine.serve(drink, 0, true, 13);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("loyalty members shouldn't receive 5th drink for free if large", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 0, "large");

    machine.serve(drink, 3, true, 13)
    machine.serve(drink, 3, true, 13)
    machine.serve(drink, 3, true, 13)
    machine.serve(drink, 3, true, 13)
    const result = machine.serve(drink, 0, true, 13);

    expect(result).toBe("Not enough money");
  });

  it("if not enough money, it doesn't serve anything", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 0, "large");

    const result = machine.serve(drink, 2, true, 13);

    expect(result).toBe("Not enough money");
  });

});
