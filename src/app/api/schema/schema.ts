const typeDefs = `#graphql
  type Machine {
    id: ID!
    name: String!
    state: String!
    x: Int!
    y: Int!
  }

  type Floor {
    id: ID!
    name: String!
    image: String!
    machines: [Machine]
  }

  input NewMachineInput {
    name: String!
    state: String!
    x: Int!
    y: Int!
  }

  input NewFloorInput {
    name: String
    image: String!
    machineIds: [ID!]
  }

  input UpdateMachineInput {
    name: String
    state: String
    x: Int
    y: Int
  }

  input UpdateFloorInput {
    name: String
    image: String
    machineIds: [ID!]
  }
  
  type Query {
    machines: [Machine]
    floors: [Floor]
    floor(id: ID!): Floor
  }

  type Mutation {
    createMachine(input: NewMachineInput!): Machine
    createFloor(input: NewFloorInput!): Floor
    updateMachine(id: ID!, input: UpdateMachineInput!): Machine
    updateFloor(id: ID!, input: UpdateFloorInput!): Floor
  }
`;

export default typeDefs;
