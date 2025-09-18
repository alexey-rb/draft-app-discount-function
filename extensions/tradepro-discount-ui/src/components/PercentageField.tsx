import {
  BlockStack,
  NumberField,
  Box,
} from "@shopify/ui-extensions-react/admin";

interface PercentageFieldProps {
  label: string;
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function PercentageField({ label, defaultValue, value, onChange, name }: PercentageFieldProps) {
  return (
    <Box>
      <BlockStack gap="base">
        <NumberField
          label={label}
          name={name}
          value={Number(value)}
          defaultValue={String(defaultValue)}
          onChange={(value) => onChange(String(value))}
          suffix="%"
        />
      </BlockStack>
    </Box>
  );
}
