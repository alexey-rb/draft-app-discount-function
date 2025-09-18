import {
  Section,
  Box,
  InlineStack,
  TextField,
  BlockStack,
  Select,
  Button,
} from "@shopify/ui-extensions-react/admin";
import { CollectionsSection } from "./CollectionsSection";

interface Collection {
  id: string;
  title: string;
}

interface I18n {
  translate: (key: string) => string;
}

interface AppliesToCollectionsProps {
  onClickAdd: () => void;
  onClickRemove: (id: string) => void;
  value: Collection[];
  defaultValue: Collection[];
  i18n: I18n;
  appliesTo: string;
  onAppliesToChange: (value: string) => void;
}

export function AppliesToCollections({
  onClickAdd,
  onClickRemove,
  value,
  defaultValue,
  i18n,
  appliesTo,
  onAppliesToChange,
}: AppliesToCollectionsProps) {
  return (
    <Section>
      {/* [START discount-ui-extension.hidden-box] */}
      <Box display="none">
        <TextField
          value={value.map(({ id }) => id).join(",")}
          label=""
          name="collectionsIds"
          defaultValue={defaultValue.map(({ id }) => id).join(",")}
        />
      </Box>
      {/* [END discount-ui-extension.hidden-box] */}
      <BlockStack gap="base">
        <InlineStack blockAlignment="end" gap="base">
          <Select
            label={i18n.translate("collections.appliesTo")}
            name="appliesTo"
            value={appliesTo}
            onChange={onAppliesToChange}
            options={[
              {
                label: i18n.translate("collections.allProducts"),
                value: "all",
              },
              {
                label: i18n.translate("collections.collections"),
                value: "collections",
              },
            ]}
          />

          {appliesTo === "all" ? null : (
            <Box inlineSize={180}>
              <Button onClick={onClickAdd}>
                {i18n.translate("collections.buttonLabel")}
              </Button>
            </Box>
          )}
        </InlineStack>
        <CollectionsSection collections={value} onClickRemove={onClickRemove} />
      </BlockStack>
    </Section>
  );
}
