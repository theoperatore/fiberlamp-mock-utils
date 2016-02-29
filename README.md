# Mock fiberlamp utils

This is to help debug and simulate the fiberlamp component. It's basically just an osc client.

# Starting it up

steps to doing the thing:

```bash
$ git clone http://the/repo
$ npm install
$ npm run mock-fiberlamp
```

you should now be running the mocked servce.

# Sending messages to the client

Included in the repo is a bin script: `bin/osc-send`

Use it by invoking: `node ./bin/osc-send` and add a `-h` to see the usage.

For your convenience, a status command has already been populated for you via npm script: 

```bash
$ npm run status
```

and that will cause the client to output it's current state.

# Ports, IP Addresses, and other environment things

Check out the `.env` file. It holds all of the things this section covers.