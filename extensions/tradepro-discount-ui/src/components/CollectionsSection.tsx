import {
  BlockStack,
  InlineStack,
  Link,
  Button,
  Icon,
  Divider,
} from "@shopify/ui-extensions-react/admin";

interface Collection {
  id: string;
  title: string;
}

interface CollectionsSectionProps {
  collections: Collection[];
  onClickRemove: (id: string) => void;
}

export function CollectionsSection({ collections, onClickRemove }: CollectionsSectionProps) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <>
      {collections.map((collection) => (
        <BlockStack gap="base" key={collection.id}>
          <InlineStack blockAlignment="center" inlineAlignment="space-between">
            <Link
              href={`shopify://admin/collections/${collection.id.split("/").pop()}`}
              tone="inherit"
              target="_blank"
            >
              {collection.title}
            </Link>
            <Button variant="tertiary" onClick={() => onClickRemove(collection.id)}>
              <Icon name="CircleCancelMajor" />
            </Button>
          </InlineStack>
          <Divider />
        </BlockStack>
      ))}
    </>
  );
}
