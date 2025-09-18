export function parseMetafield(value: string | undefined) {
  try {
    const parsed = JSON.parse(value || "{}");
    return {
      percentages: {
        product: Number(parsed.cartLinePercentage ?? 0),
        order: Number(parsed.orderPercentage ?? 0),
        shipping: Number(parsed.deliveryPercentage ?? 0),
      },
      collectionIds: parsed.collectionIds ?? [],
    };
  } catch {
    return {
      percentages: { product: 0, order: 0, shipping: 0 },
      collectionIds: [],
    };
  }
}
