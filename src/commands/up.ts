// packages
import { Command, flags } from "@oclif/command";
import { chunk, fromPairs } from "lodash";
import pipe from "lodash/fp/pipe";

// utils
import { boilerplateExists, emoji, print } from "../utils";

export default class Up extends Command {
  static description = "run one of your boilerplate template commands";

  static strict = false; // allow any user inputs

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    {
      name: "command",
      required: true,
      description: `call up a template command defined in the '.boilerplate' folder`,
    },
  ];

  async run() {
    const { args, flags } = this.parse(Up);
    const { command } = args;
    const inputs = process.argv;
    const commandIndex = inputs.indexOf(command);
    const inputsAfterCommand = inputs.slice(commandIndex + 1);
    const pairs = pipe(chunk, fromPairs)(inputsAfterCommand, 2);

    // 1. check that '.boilerplate' folder exists
    if (!boilerplateExists()) {
      return this.error(
        `${emoji(":unamused:")} ${print(
          `looks like you don't have a '.boilerplate' folder - run 'boil init' to start a new project`,
          "red"
        )}`
      );
    }

    console.log(pairs);
  }
}
