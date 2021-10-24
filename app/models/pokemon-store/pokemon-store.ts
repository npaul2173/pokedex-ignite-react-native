import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Pokemon, PokemonModel, PokemonSnapshot } from "../pokemon/pokemon"

import { GetAllPokemonsResult } from "../../services/api/api.types"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const PokemonStoreModel = types
  .model("PokemonStore")
  .props({
    pokemons: types.optional(types.array(PokemonModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    savePokemons: (pokemonSnapshotS: PokemonSnapshot[]) => {
      const pokemonModels: Pokemon[] = pokemonSnapshotS.map((c) => PokemonModel.create(c)) // create model instances from the plain objects

      // console.log({ pokemonModels })

      self.pokemons.replace(pokemonModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getPokemons: flow(function* () {
      const result: GetAllPokemonsResult = yield self.environment.api.getAllPokemons()
      // console.log({ result })

      if (result.kind === "ok") {
        self.savePokemons(result.pokemons)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
type PokemonStoreType = Instance<typeof PokemonStoreModel>
export interface PokemonStore extends PokemonStoreType {}
type PokemonStoreSnapshotType = SnapshotOut<typeof PokemonStoreModel>
export interface PokemonStoreSnapshot extends PokemonStoreSnapshotType {}
export const createPokemonStoreDefaultModel = () => types.optional(PokemonStoreModel, {})
