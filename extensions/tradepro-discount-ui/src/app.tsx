import {
  BlockStack,
  FunctionSettings,
  Section,
  Text,
  Form,
  Heading,
  Divider,
} from "@shopify/ui-extensions-react/admin";
import { useExtensionData } from "./useExtensionData";
import { PercentageField } from "./components/PercentageField";
import { AppliesToCollections } from "./components/AppliesToCollections";

export function App() {
  const {
    applyExtensionMetafieldChange,
    i18n,
    initialPercentages,
    onPercentageValueChange,
    percentages,
    resetForm,
    initialCollections,
    collections,
    appliesTo,
    onAppliesToChange,
    removeCollection,
    onSelectedCollections,
    loading,
  } = useExtensionData();

  if (loading) {
    return <Text>{i18n.translate("loading")}</Text>;
  }

  return (
    <FunctionSettings onSave={applyExtensionMetafieldChange}>
      <Heading size={6}>{i18n.translate("title")}</Heading>
      <Form onSubmit={() => {}} onReset={resetForm}>
        <Section>
          <BlockStack gap="base">
            <BlockStack gap="base">
              <PercentageField
                value={String(percentages.product)}
                defaultValue={String(initialPercentages.product)}
                onChange={(value) => onPercentageValueChange("product", value)}
                label={i18n.translate("percentage.Product")}
                name="product"
              />

              <AppliesToCollections
                onClickAdd={onSelectedCollections}
                onClickRemove={removeCollection}
                value={collections}
                defaultValue={initialCollections}
                i18n={i18n}
                appliesTo={appliesTo}
                onAppliesToChange={onAppliesToChange}
              />
            </BlockStack>
            {collections.length === 0 ? <Divider /> : null}
            <PercentageField
              value={String(percentages.order)}
              defaultValue={String(initialPercentages.order)}
              onChange={(value) => onPercentageValueChange("order", value)}
              label={i18n.translate("percentage.Order")}
              name="order"
            />

            <PercentageField
              value={String(percentages.shipping)}
              defaultValue={String(initialPercentages.shipping)}
              onChange={(value) => onPercentageValueChange("shipping", value)}
              label={i18n.translate("percentage.Shipping")}
              name="shipping"
            />
          </BlockStack>
        </Section>
      </Form>
    </FunctionSettings>
  );
}
