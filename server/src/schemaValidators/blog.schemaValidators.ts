import { CreateCollectionOptions } from "mongodb";

const blogValidator: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "sections",
        "author",
        "comments",
        "likes",
        "dislikes",
        "totalComments",
        "updatedAt",
        "createdAt",
      ],
      description: "blog json schema",
      properties: {
        _id: {
          bsonType: "objectId",
        },
        sections: {
          bsonType: "array",
          description: "blog sections schema",
          items: {
            bsonType: "object",
            minItems: 2,
            maxItems: 10,
            oneOf: [
              {
                bsonType: "object",
                required: ["type", "text"],
                properties: {
                  type: { bsonType: "string", enum: ["heading"] },
                  text: {
                    bsonType: "string",
                    minLength: 10,
                  },
                },
              },
              {
                bsonType: "object",
                required: ["type", "text"],
                properties: {
                  type: { bsonType: "string", enum: ["paragraph"] },
                  text: {
                    bsonType: "string",
                    minLength: 30,
                  },
                },
              },
              {
                bsonType: "object",
                required: ["type", "url", "caption"],
                properties: {
                  type: { bsonType: "string", enum: ["image"] },
                  caption: {
                    bsonType: "string",
                    minLength: 6,
                  },
                  url: {
                    bsonType: "string",
                  },
                },
              },
              {
                bsonType: "object",
                required: ["type", "url", "title", "paragraph"],
                properties: {
                  type: { bsonType: "string", enum: ["image-and-paragraph"] },
                  title: { bsonType: "string", minLength: 6 },
                  paragraph: { bsonType: "string", minLength: 30 },
                  url: { bsonType: "string" },
                },
              },
            ],
          },
        },
        author: {
          bsonType: "objectId",
          description: "Reference to user collection",
        },
        comments: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
            description: "Reference to comment collection",
          },
        },
        likes: {
          bsonType: "number",
          minimum: 0,
        },
        dislikes: {
          bsonType: "number",
          minimum: 0,
        },
        totalComments: {
          bsonType: "number",
          minimum: 0,
        },
        updatedAt: {
          bsonType: "date",
        },
        createdAt: {
          bsonType: "date",
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict",
  validationAction: "error",
};

export default blogValidator;
