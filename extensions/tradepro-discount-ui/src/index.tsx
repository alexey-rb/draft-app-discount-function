
  import { reactExtension } from "@shopify/ui-extensions-react/admin";
  import { getMetafieldDefinition } from "./utils/getMetafieldDefinition";
  import { createMetafieldDefinition } from "./utils/createMetafieldDefinition";
  import { App } from "./App";

  const TARGET = "admin.discount-details.function-settings.render";

  export default reactExtension(TARGET, async (api) => {
    const existingDefinition = await getMetafieldDefinition(api.query);
    if (!existingDefinition) {
      // Create a metafield definition for persistence if no pre-existing definition exists
      const metafieldDefinition = await createMetafieldDefinition(api.query);

      if (!metafieldDefinition) {
        throw new Error("Failed to create metafield definition");
      }
    }
    return <App />;
  });





