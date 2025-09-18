import { useApi } from "@shopify/ui-extensions-react/admin";
import { useState, useMemo, useEffect } from "react";
import { parseMetafield } from "./utils/parseMetafield";

const TARGET = "admin.discount-details.function-settings.render";
const METAFIELD_NAMESPACE = "$app:tradepro-discount";
const METAFIELD_KEY = "function-configuration";

export function useExtensionData() {
  const { applyMetafieldChange, i18n, data, resourcePicker, query } =
    useApi(TARGET);
  const metafieldConfig = useMemo(
    () =>
      parseMetafield(
        data?.metafields.find(
          (metafield) => metafield.key === "function-configuration"
        )?.value
      ),
    [data?.metafields]
  );
  const [percentages, setPercentages] = useState(metafieldConfig.percentages);
  const [initialCollections, setInitialCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [appliesTo, setAppliesTo] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      const selectedCollections = await getCollections(
        metafieldConfig.collectionIds,
        query
      );
      setInitialCollections(selectedCollections);
      setCollections(selectedCollections);
      setLoading(false);
      setAppliesTo(selectedCollections.length > 0 ? "collections" : "all");
    };
    fetchCollections();
  }, [metafieldConfig.collectionIds, query]);

  const onPercentageValueChange = async (type, value) => {
    setPercentages((prev) => ({
      ...prev,
      [type]: Number(value),
    }));
  };

  const onAppliesToChange = (value) => {
    setAppliesTo(value);
    if (value === "all") {
      setCollections([]);
    }
  };

  async function applyExtensionMetafieldChange() {
    await applyMetafieldChange({
      type: "updateMetafield",
      namespace: METAFIELD_NAMESPACE,
      key: METAFIELD_KEY,
      value: JSON.stringify({
        cartLinePercentage: percentages.product,
        collectionIds: collections.map(({ id }) => id),
      }),
      valueType: "json",
    });
    setInitialCollections(collections);
  }

  const resetForm = () => {
    setPercentages(metafieldConfig.percentages);
    setCollections(initialCollections);
    setAppliesTo(initialCollections.length > 0 ? "collections" : "all");
  };

  const onSelectedCollections = async () => {
    const selection = await resourcePicker({
      type: "collection",
      selectionIds: collections.map(({ id }) => ({ id })),
      action: "select",
      filter: {
        archived: true,
        variants: true,
      },
    });
    setCollections(selection ?? []);
  };

  const removeCollection = (id) => {
    setCollections((prev) => prev.filter((collection) => collection.id !== id));
  };

  return {
    applyExtensionMetafieldChange,
    i18n,
    initialPercentages: metafieldConfig.percentages,
    onPercentageValueChange,
    percentages,
    resetForm,
    collections,
    initialCollections,
    removeCollection,
    onSelectedCollections,
    loading,
    appliesTo,
    onAppliesToChange,
  };
}

async function getCollections(collectionGids, adminApiQuery) {
  const query = `#graphql
    query GetCollections($ids: [ID!]!) {
      collections: nodes(ids: $ids) {
        ... on Collection {
          id
          title
        }
      }
    }
  `;
  const result = await adminApiQuery(query, {
    variables: { ids: collectionGids },
  });
  return result?.data?.collections ?? [];
}
