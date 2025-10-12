// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local",
  token: process.env.TINA_TOKEN || "local",
  build: {
    outputFolder: "tina",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/sections",
      publicFolder: "src"
    }
  },
  schema: {
    collections: [
      {
        name: "section",
        label: "Sections",
        path: "content/sections",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Titre",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true
          },
          {
            name: "description",
            label: "Description",
            type: "string"
          },
          {
            name: "gallery",
            label: "Images",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.alt || item?.imageId || "Image"
              })
            },
            fields: [
              {
                name: "imageId",
                label: "Identifiant d'image",
                type: "string",
                required: true,
                description: "Identifiant correspondant \xE0 une image d\xE9clar\xE9e dans le code (ex: 'parentalite')."
              },
              {
                name: "alt",
                label: "Texte alternatif",
                type: "string"
              }
            ]
          },
          {
            name: "body",
            label: "Contenu",
            type: "rich-text",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
