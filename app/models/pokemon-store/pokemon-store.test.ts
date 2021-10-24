import { PokemonStoreModel } from "./pokemon-store"

test("can be created", () => {
  const instance = PokemonStoreModel.create({})

  expect(instance).toBeTruthy()
})
