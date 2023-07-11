import { Movie } from "../entity/Movie";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  hello() {
    console.log("object", Movie)
    return "hi!";
  }

}
